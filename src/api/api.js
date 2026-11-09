const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

function removeAccessToken() {
  localStorage.removeItem('accessToken');
}

async function fetchWithAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function parseResponse(response) {
  const responseJson = await response.json();
  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }
  return responseJson.data;
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const { user } = await parseResponse(response);
  return user;
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const { token } = await parseResponse(response);
  return token;
}

async function getOwnProfile() {
  const response = await fetchWithAuth(`${BASE_URL}/users/me`);
  const { user } = await parseResponse(response);
  return user;
}

async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const { users } = await parseResponse(response);
  return users;
}

async function getAllThreads() {
  const response = await fetch(`${BASE_URL}/threads`);
  const { threads } = await parseResponse(response);
  return threads;
}

async function getThreadDetail(threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}`);
  const { detailThread } = await parseResponse(response);
  return detailThread;
}

async function createThread({ title, body, category }) {
  const response = await fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, category }),
  });
  const { thread } = await parseResponse(response);
  return thread;
}

async function createComment({ threadId, content }) {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  const { comment } = await parseResponse(response);
  return comment;
}

const VOTE_PATHS = {
  up: 'up-vote',
  down: 'down-vote',
  neutral: 'neutral-vote',
};

async function voteThread(threadId, voteType) {
  const response = await fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/${VOTE_PATHS[voteType]}`,
    { method: 'POST' },
  );
  const { vote } = await parseResponse(response);
  return vote;
}

async function voteComment(threadId, commentId, voteType) {
  const response = await fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/${VOTE_PATHS[voteType]}`,
    { method: 'POST' },
  );
  const { vote } = await parseResponse(response);
  return vote;
}

async function getLeaderboards() {
  const response = await fetch(`${BASE_URL}/leaderboards`);
  const { leaderboards } = await parseResponse(response);
  return leaderboards;
}

const api = {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getThreadDetail,
  createThread,
  createComment,
  voteThread,
  voteComment,
  getLeaderboards,
};

export default api;
