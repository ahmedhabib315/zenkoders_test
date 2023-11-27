import axios from 'axios';
import { NewsPayload, UserDetails } from '../helpers/interfaces';
import { message } from '../helpers/constants';

/**
 * 
 * Get News from the server
 * 
 * @param userDetails 
 * @param payload 
 * @returns 
 */
export function getNews(userDetails: UserDetails, payload: NewsPayload) {
  return axios.post(`${process.env.REACT_APP_API_URL}/news/get-news`,
    {
      ...payload
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

/**
 * 
 * Get latest headlines from the server
 * 
 * @param userDetails 
 * @returns 
 */
export const getHeadlines = (userDetails: UserDetails) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/news/get-headlines`,{}, {
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

/**
 * 
 * Get news Summary
 * 
 * @param userDetails 
 * @param description 
 * @returns 
 */
export const getSummary = (userDetails: UserDetails, description: string) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/openai/summary`,{
    description
  }, {
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