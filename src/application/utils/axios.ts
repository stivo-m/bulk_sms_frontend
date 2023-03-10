import axiosClient from 'axios';

let token = null;
if (typeof window !== 'undefined') {
  token = sessionStorage.getItem('token');
}

/**
 * Creates an initial 'axios' instance with custom settings.
 */
const axios = axiosClient.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
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
    if ('token' in res.data.data) {
      sessionStorage.setItem('token', res.data.data.token);
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
