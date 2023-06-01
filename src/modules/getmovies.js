const updateTotalLikes = () => {
  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error retrieving total likes: ${response.status}`);
    })
    .then((likesData) => {
      const totalLikesElements = document.querySelectorAll('.counter');
      totalLikesElements.forEach((likesElement) => {
        const itemId = likesElement.getAttribute('id').split('-')[2];
        const itemLikes = likesData.find((item) => item.item_id === itemId);

        if (itemLikes) {
          const totalLikes = itemLikes.likes || 0;
          likesElement.textContent = totalLikes;
        } else {
          likesElement.textContent = '0';
        }
      });
    })
    .catch((error) => {
      console.error('Error retrieving total likes:', error);
    });
};

const getImage = () => {
  const imageContainer = document.querySelector('.movies-banners');

  fetch('https://api.tvmaze.com/shows?page=2')
    .then((response) => response.json())
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
            .then((response) => response.json())
            .then((data) => {
              const itemLikes = data.find((item) => item.item_id === itemId);

              if (itemLikes) {
                const totalLikesElement = document.getElementById(`total-likes-${itemId}`);
                const totalLikes = itemLikes.likes || 0;
                totalLikesElement.textContent = totalLikes;
              }

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
                    console.error('Failed to record like:', response.status);
                  }
                })
                .catch((error) => {
                  console.error('Error recording like:', error);
                });
            })
            .catch((error) => {
              console.error('Error retrieving data:', error);
            });
        });
      });

      updateTotalLikes();
    });
};

export default getImage;
