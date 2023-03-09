import axiosClient from 'axios';

let token = null;
if (typeof window !== 'undefined') {
  localStorage.getItem('token');
}

/**
 * Creates an initial 'axios' instance with custom settings.
 */
const axios = axiosClient.create({
  baseURL: 'http://localhost:4040/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${token}`,
  },
});

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
axios.interceptors.response.use(
  (res) => {
    if (res.data.contains('token')) {
      localStorage.setItem('token', res.data.token);
    }
    return res.data;
  },
  (err) => {
    if (err.response) {
      return Promise.reject(err.response.data);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err.message);
  }
);

export default axios;
