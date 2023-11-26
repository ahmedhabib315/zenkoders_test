import axios from 'axios';
import { message } from '../constants/constants';
import { Login, Signup } from '../constants/interfaces';

export async function login(payload: Login) {
  return await axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, {
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

export async function signup(payload: Signup) {
  return await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, {
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