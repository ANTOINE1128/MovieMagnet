const getComments = async (movieId) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/comments/?item_id=${movieId}`);
    if (!response.ok) {
      throw new Error(`Error fetching comments: ${response.status}`);
    }
    const comments = await response.json();
    const commentsList = document.querySelector(`#comment-list-${movieId}`);
    commentsList.innerHTML = '';
    comments.forEach((comment) => {
      console.log(comment)
      const commentMarkup = `
        <div class="comment">
          <p>${comment.creation_date}, ${comment.username} : ${comment.comment}</p>
        </div>`;
      commentsList.insertAdjacentHTML('beforeend', commentMarkup);
    });
  } catch (error) {
    console.error('Error retrieving comments:', error);
  }
};

const getCommentCount = async (movieId) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/comments/?item_id=${movieId}`);
    if (!response.ok) {
      throw new Error(`Error fetching comments: ${response.status}`);
    }
    const comments = await response.json();
    const commentCountElement = document.querySelector(`#comment-count-${movieId}`);
    commentCountElement.textContent = comments.length;
  } catch (error) {
    console.error('Error retrieving comment count:', error);
  }
};

export { getComments, getCommentCount };
