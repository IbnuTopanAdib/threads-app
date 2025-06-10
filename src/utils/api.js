const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';
  const DEFAULT_TIMEOUT = 8000;

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function withTimeout(promise, timeout = DEFAULT_TIMEOUT) {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
      ),
    ]);
  }

  async function _fetchWithAuth(url, options = {}, timeout = DEFAULT_TIMEOUT) {
    return withTimeout(fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }), timeout);
  }

  async function _handleResponse(response) {
    const json = await response.json();
    const { status, message } = json;
    if (status !== 'success') throw new Error(message);
    return json.data;
  }

  async function register({ name, email, password }) {
    const res = await withTimeout(fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    }));
    const { user } = await _handleResponse(res);
    return user;
  }

  async function login({ email, password }) {
    const res = await withTimeout(fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }));
    const { token } = await _handleResponse(res);
    return token;
  }

  async function getOwnProfile() {
    const res = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const { user } = await _handleResponse(res);
    return user;
  }

  async function getAllUsers() {
    const res = await withTimeout(fetch(`${BASE_URL}/users`));
    const { users } = await _handleResponse(res);
    return users;
  }

  async function getAllThreads() {
    const res = await withTimeout(fetch(`${BASE_URL}/threads`));
    const { threads } = await _handleResponse(res);
    return threads;
  }

  async function createThreads({ title, body, category }) {
    const res = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, category }),
    });
    const { thread } = await _handleResponse(res);
    return thread;
  }

  async function voteThread(id, type) {
    const res = await _fetchWithAuth(`${BASE_URL}/threads/${id}/${type}`, {
      method: 'POST',
    });
    const { vote: { voteType } } = await _handleResponse(res);
    return voteType;
  }

  const upVoteThread = (id) => voteThread(id, 'up-vote');
  const downVoteThread = (id) => voteThread(id, 'down-vote');
  const neutralizeVoteThread = (id) => voteThread(id, 'neutral-vote');

  async function getThreadDetail(id) {
    const res = await _fetchWithAuth(`${BASE_URL}/threads/${id}`);
    const { detailThread } = await _handleResponse(res);
    return detailThread;
  }

  async function createComment({ id, content }) {
    const res = await _fetchWithAuth(`${BASE_URL}/threads/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const { comment } = await _handleResponse(res);
    return comment;
  }

  async function voteComment(threadId, commentId, type) {
    const res = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/${type}`, {
      method: 'POST',
    });
    await _handleResponse(res);
  }

  const upVoteComment = ({ threadId, commentId }) => voteComment(threadId, commentId, 'up-vote');
  const downVoteComment = ({ threadId, commentId }) => voteComment(threadId, commentId, 'down-vote');
  const neutralizeVoteComment = ({ threadId, commentId }) => voteComment(threadId, commentId, 'neutral-vote');

  async function getLeaderboards() {
    const res = await _fetchWithAuth(`${BASE_URL}/leaderboards`, {}, 5000); // Timeout 5 detik
    const { leaderboards } = await _handleResponse(res);
    return leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThreads,
    upVoteThread,
    downVoteThread,
    neutralizeVoteThread,
    getThreadDetail,
    createComment,
    upVoteComment,
    downVoteComment,
    neutralizeVoteComment,
    getLeaderboards,
  };
})();

export default api;
