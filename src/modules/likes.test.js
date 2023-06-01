import updateTotalLikes from './likes';

// Mock the fetch function to return a specific response
global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve([
    { item_id: '1', likes: 5 },
    { item_id: '2', likes: 10 },
  ]),
}));

describe('updateTotalLikes', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="counter" id="total-likes-1">0</div>
      <div class="counter" id="total-likes-2">0</div>
    `;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update total likes correctly', async () => {
    await updateTotalLikes();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/',
    );

    expect(document.getElementById('total-likes-1').textContent).toBe('5');
    expect(document.getElementById('total-likes-2').textContent).toBe('10');
  });

  it('should handle errors when fetching likes data', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch likes data')));

    await updateTotalLikes();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SpsK74xULIr0Fmgge82L/likes/',
    );

    // Verify that the total likes remain unchanged
    expect(document.getElementById('total-likes-1').textContent).toBe('0');
    expect(document.getElementById('total-likes-2').textContent).toBe('0');
  });
});
