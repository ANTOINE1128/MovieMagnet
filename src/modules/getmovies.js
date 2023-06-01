const getImage = () => {
  const imageContainer = document.querySelector('.movies-banners');
  fetch('https://api.tvmaze.com/shows?page=1')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const markup = `<div class="movie-section">
        <div class="img-card">
      <img src="${element.image.medium}" alt="movies image">
  </div>
  <div class="img-description">
      <div class="movies-name">
          <h3>${element.name}</h3>
          <div class="action">
              <button type="button" data-id="${element.id}" class="comment">Comment</button>
              <span>
              <i class="fa-regular fa-thumbs-up"></i>
              <small>12</small>

              </span>
          </div>
      </div>

  </div>
  </div>`;
        imageContainer.insertAdjacentHTML('beforeend', markup);
        const getComent = () => {
          const comment = document.querySelectorAll('.comment');
          for (let i = 0; i < comment.length; i += 1) {
            comment[i].addEventListener('click', (event) => {
              const popup = document.querySelector('#popup-modal');

              const commentid = event.target;
              const movieId = commentid.getAttribute('data-id');
              const relatedItem = data.find(
                (item) => item.id === parseInt(movieId, 10),
              );
              const relatedImage = relatedItem.image.original;
              popup.innerHTML = '';
              const popupMarkup = `
        <div class="img">
          <div class="movies-details-section">
            <img src="${relatedImage}" alt="movies images">
            <span id="close-btn">&#10005;</span>
            <div class="summary">
              <p>
                Name: ${relatedItem.name} &nbsp;&nbsp;&nbsp; Genres: ${relatedItem.genres} <br>
                Country: ${relatedItem.network.country.name} &nbsp;&nbsp;&nbsp; Language: ${relatedItem.language} <br>
                Released Date : ${relatedItem.premiered} &nbsp;&nbsp;&nbsp; Status: ${relatedItem.status}<br>
              </p>
            </div>
          </div>
          <div class="description">
            <div class="added-comment">
                <p>Name : Bahati</p>
                <p>Comments : This is the comments</p>
            </div>
        </div>

          <div class="comment-section">
              <form id="form">
                  <input type="text" name="name" placeholder=" Your Name">
                  <textarea name="message" placeholder=" Your Insights"></textarea>
                  <button type="submit">comment</button>
              </form>
          </div>

        </div>`;

              popup.insertAdjacentHTML('beforeend', popupMarkup);

              popup.style.display = 'block';

              const closeBtn = document.querySelector('#close-btn');
              closeBtn.addEventListener('click', () => {
                popup.style.display = 'none';
              });
            });
          }
        };

        getComent();
      });
    });
};
export default getImage;