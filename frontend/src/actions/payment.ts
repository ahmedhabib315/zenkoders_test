import axios from "axios";
import { message } from "../helpers/constants";
import { UserDetails } from "../helpers/interfaces";

/**
 * 
 * Get Packages from server
 * 
 * @param payload 
 * @returns 
 */
export function getPackages(userDetails: UserDetails) {
  return axios.get(`${process.env.REACT_APP_API_URL}/packages`, {
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


/**
 * 
 * Subscribe a Package for the user
 * 
 * @param userDetails 
 * @param token 
 * @param package_name 
 * @returns 
 */
export function payNow(userDetails: UserDetails, token: string, package_name: string) {
  return axios.post(`${process.env.REACT_APP_API_URL}/payments/subscription`, {
    token,
    package_name
  },
    {
      headers: {
        'Authorization': 'Bearer ' + userDetails.access_token
      }
    })
    .then(function (response) {
      if (response.data.data) {
        return { data: response.data.data, code: 200 };
      }
      return { data: response.data, code: 500 };
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