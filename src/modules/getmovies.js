import { getComments, getCommentCount } from './comments.js';
import updateTotalLikes from './likes.js';

const initializeComments = (data) => {
  const commentButtons = document.querySelectorAll('.comment');

  commentButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const popup = document.querySelector('#popup-modal');
      const movieId = button.getAttribute('data-id');
      const relatedItem = data.find((item) => item.id === parseInt(movieId, 10));

      popup.innerHTML = '';

      const popupMarkup = `
        <div class="img">
          <div class="movies-details-section">
            <img src="${relatedItem.image.original}" alt="movies images">
            <span id="close-btn">&#10005;</span>
            <div class="summary">
              <p>
                Name: ${relatedItem.name} &nbsp;&nbsp;&nbsp; Genres: ${relatedItem.genres} <br>
                Country: ${relatedItem.network.country.name} &nbsp;&nbsp;&nbsp; Language: ${relatedItem.language} <br>
                Released Date: ${relatedItem.premiered} &nbsp;&nbsp;&nbsp; Status: ${relatedItem.status}<br>
              </p>
            </div>
          </div>
          <div class="description">
            <div class="comment-count">
              <p>Comment: <span id="comment-count-${movieId}">0</span> <p>
            </div>
            <div class="added-comment">
              <div class='comment-list-style' id="comment-list-${movieId}"></div>
            </div>
          </div>
          <div class="comment-section">
            <form id="form-${movieId}">
              <input type="text" name="name" placeholder="Your Name">
              <textarea name="message" placeholder="Your Insights"></textarea>
              <button type="submit">Comment</button>
            </form>
          </div>
        </div>`;

      popup.insertAdjacentHTML('beforeend', popupMarkup);

      popup.style.display = 'block';

      const closeBtn = document.querySelector('#close-btn');
      closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
      });

      const form = document.getElementById(`form-${movieId}`);
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const message = formData.get('message');

        const commentData = {
          item_id: relatedItem.id,
          username: name,
          comment: message,
        };

        fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/comments/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentData),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Comment posted successfully!');

              getComments(movieId);

              getCommentCount(movieId);
            } else {
              throw new Error(`Failed to post comment: ${response.status}`);
            }
          })
          .catch((error) => {
            console.error('Error posting comment:', error);
          });
      });

      getComments(movieId);

      getCommentCount(movieId);
    });
  });
};
const getMovies = () => {
  const imageContainer = document.querySelector('.movies-banners');

  fetch('https://api.tvmaze.com/shows?page=2')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error fetching data: ${response.status}`);
    })
    .then((data) => {
      data.forEach((element) => {
        const markup = `
          <div class="movie-section">
            <div class="img-card">
              <img src="${element.image.medium}" alt="movies image">
            </div>
            <div class="img-description">
              <div class="movies-name">
                <h3>${element.name}</h3>
                <div class="action">
                  <button type="button" data-id="${element.id}" class="comment">Comment</button>
                  <span>
                    <i class="fa-regular fa-thumbs-up thumbsUpBtn"></i>
                    <small class="counter" id="total-likes-${element.id}">0</small>
                  </span>
                </div>
              </div>
            </div>
          </div>`;

        imageContainer.insertAdjacentHTML('beforeend', markup);
      });

      const thumbsUpButtons = document.querySelectorAll('.thumbsUpBtn');
      thumbsUpButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const itemId = button.parentElement.parentElement.querySelector('.comment').getAttribute('data-id');

          fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/')
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error(`Error fetching likes data: ${response.status}`);
            })
            .then((data) => {
              const itemLikes = data.find((item) => item.item_id === itemId);
              const totalLikesElement = document.getElementById(`total-likes-${itemId}`);
              const totalLikes = itemLikes ? itemLikes.likes || 0 : 0;
              totalLikesElement.textContent = totalLikes;

              fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id: itemId }),
              })
                .then((response) => {
                  if (response.ok) {
                    console.log('Like recorded successfully!');
                    updateTotalLikes();
                  } else {
                    throw new Error(`Failed to record like: ${response.status}`);
                  }
                })
                .catch((error) => {
                  console.error('Error recording like:', error);
                });
            })
            .catch((error) => {
              console.error('Error retrieving likes data:', error);
            });
        });
      });

      initializeComments(data);
      updateTotalLikes();
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};

export default getMovies;
