import axios from 'axios';


export async function login(payload: any) {
  return await axios.post('http://localhost:3001/api/v1/user/signin', {
    email: payload.email,
    password: payload.password,
    name: payload.name,
  })
    .then(function (response) {
      if (response.data.data) {
        return { data: response.data.data, code: 200 };
      }
    })
    .catch(function (error) {
      if (!error.response) {
        return { msg: 'Some Error Occurred. Please try again Later', code: 500 }
      }
      else {
        if (Array.isArray(error.response.data.data)) {
          return { msg: 'Incorrect Credentials', code: 403 }
        }
        return { msg: 'Incorrect Credentials', code: 403 }
      }
    });
}

export async function signup(payload: any) {
  return await axios.post('http://localhost:3001/api/v1/user/signup', {
    email: payload.email,
    password: payload.password,
    name: payload.name,
  })
    .then(function (response) {
      if (response.data.data) {
        return { msg: 'Your account has been created successfully. Please login to continue', code: 200 };
      }
    })
    .catch(function (error) {
      if (!error.response) {
        return { msg: 'Some Error Occurred. Please try again Later', code: 500 }
      }
      else {
        if (Array.isArray(error.response.data.data)) {
          return { msg: error.response.data.data[0], code: 403 }
        }
        return { msg: error.response.data.data, code: 403 }
      }
    });
}