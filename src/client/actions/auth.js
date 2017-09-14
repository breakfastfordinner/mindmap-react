/* eslint-disable */

import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const REQUESTS = {
  register: 'http://mindflare.me/api/auth/register',
  login: 'http://mindflare.me/api/auth/login',
};
const ERROR_CODES = {
  register: 422,
  login: 401,
};

const authenticateUser = async (username, password, { type }) => {
  try {
    const request = REQUESTS[type];
    const user = { username, password };
    const response = await axios.post(request, user);

    cookies.set('user', response.data, { path: '/' });

    return { status: 201 };
  } catch (error) {
    return {
      status: ERROR_CODES[type],
      error,
    };
  }
};

const logOutUser = () => {
  cookies.remove('user', { path: '/' });
  return {
    status: 204,
  };
};

module.exports = {
  authenticateUser,
  logOutUser,
};
