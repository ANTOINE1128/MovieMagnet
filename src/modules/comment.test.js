const fetchMock = require('jest-fetch-mock');
const { getComments, getCommentCount } = require('./comments');

fetchMock.enableMocks();

describe('getComments', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should fetch comments and display them in the comments list', async () => {
    const comments = [
      { id: 1, username: 'User1', comment: 'Comment 1' },
      { id: 2, username: 'User2', comment: 'Comment 2' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(comments));
    const movieId = 1;
    const commentsListElement = document.createElement('div');
    commentsListElement.id = `comment-list-${movieId}`;
    document.body.appendChild(commentsListElement);
    await getComments(movieId);
    expect(commentsListElement.innerHTML).toContain('Comment 1');
    expect(commentsListElement.innerHTML).toContain('Comment 2');
  });
});

describe('getCommentCount', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should fetch comments and display the comment count', async () => {
    const comments = [
      { id: 1, username: 'User1', comment: 'Comment 1' },
      { id: 2, username: 'User2', comment: 'Comment 2' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(comments));

    const movieId = 1;
    const commentCountElement = document.createElement('div');
    commentCountElement.id = `comment-count-${movieId}`;
    document.body.appendChild(commentCountElement);
    await getCommentCount(movieId);

    expect(commentCountElement.textContent).toBe('2');
  });

});