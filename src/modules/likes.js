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
        const totalLikes = itemLikes ? itemLikes.likes || 0 : 0;
        likesElement.textContent = totalLikes;
      });
    })
    .catch((error) => {
      console.error('Error retrieving total likes:', error);
    });
};

export default updateTotalLikes;