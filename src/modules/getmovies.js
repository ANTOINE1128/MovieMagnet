export const getImage = () => {
  const imageContainer = document.querySelector(".movies-banners");
  fetch("https://api.tvmaze.com/shows?page=1")
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
        imageContainer.insertAdjacentHTML("beforeend", markup);

      });
    });
};
