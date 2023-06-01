const updateTotalLikes = async () => {
  try {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/');
    if (!response.ok) {
      throw new Error('Failed to fetch likes data');
    }
    const likesData = await response.json();

    likesData.forEach((item) => {
      const { item_id: itemId, likes } = item;
      const likesElement = document.getElementById(`total-likes-${itemId}`);
      if (likesElement) {
        likesElement.textContent = likes.toString();
      }
    });
  } catch (error) {
    console.error('Error retrieving total likes:', error);
  }
};

export default updateTotalLikes;