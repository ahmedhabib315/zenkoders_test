import axios from 'axios';
import { Login, Signup, UserDetails } from '../helpers/interfaces';
import { message } from '../helpers/constants';

/**
 * 
 * Send Login Request and handle Response
 * 
 * @param payload 
 * @returns 
 */
export function login(payload: Login) {
  return axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, {
    email: payload.email,
    password: payload.password,
  })
    .then(function (response) {
      if (response.data.data) {
        return { data: response.data.data, code: 200 };
      }
    })
    .catch(function (error) {
      if (!error.response) {
        return { msg: message.error_occurred, code: 500 }
      }
      else {
        if (Array.isArray(error.response.data.data)) {
          return { msg: message.incorrect_credentials, code: 403 }
        }
        return { msg: message.incorrect_credentials, code: 403 }
      }
    });
}

/**
 * 
 * Send Signup Request and handle Response
 * 
 * @param payload 
 * @returns 
 */
export function signup(payload: Signup) {
  return axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, {
    email: payload.email,
    password: payload.password,
    name: payload.name,
  })
    .then(function (response) {
      if (response.data.data) {
        return { msg: message.created_successfully, code: 200 };
      }
    })
    .catch(function (error) {
      if (!error.response) {
        return { msg: message.error_occurred, code: 500 }
      }
      else {
        if (Array.isArray(error.response.data.data)) {
          return { msg: error.response.data.data[0], code: 403 }
        }
        return { msg: error.response.data.data, code: 403 }
      }
    });
}

/**
 * 
 * Send Login Request and handle Response
 * 
 * @param payload 
 * @returns 
 */
export function logout(userDetails: UserDetails) {
  return axios.post(`${process.env.REACT_APP_API_URL}/user/logout`, {}, {
    headers: {
      'Authorization': 'Bearer ' + userDetails.access_token
    }
  })
    .then(function (response) {
      if (response.data.data) {
        return { data: response.data.data, code: 200 };
      }
    })
    .catch(function (error) {
      if (!error.response) {
        return { msg: message.error_occurred, code: 500 }
      }
      else {
        return { msg: message.incorrect_credentials, code: 401 }
      }
    });
}