import axios from "axios";
import { getStage } from "../utils/misc";

import DEV_CONFIG from './dev.stage';
import PROD_CONFIG from './prod.stage';
import LOCAL_CONFIG from './local.stage';

const stage = getStage();

let CONFIG = LOCAL_CONFIG;
if (stage === 'prod') CONFIG = PROD_CONFIG; else if (stage === 'dev') CONFIG = DEV_CONFIG; else CONFIG = LOCAL_CONFIG;

export const serverEndpoint = CONFIG.serverEndPoint;

/* eslint class-methods-use-this: ["error", { "enforceForClassFields": false }] */
class Helpers {
  /**
   * fetchHelper
   *
   * @param {object} reqParams parameters for request
   * @return {Promise} for parameters
   */
  fetchHelper = (reqParams) => {
    const {
      url, method, headers = {}, data, file,
    } = reqParams;

    const fetchPromise = async (resolve, reject) => {
      const uid = localStorage.getItem("uid");
      axios({
        url: CONFIG.serverEndPoint + url,
        method,
        headers: {
          ...headers,
          uid,
        },
        data: file || (data && JSON.stringify(data)),
      })
        .then((response) => response)
        .then((response) => [response.data, response.status])
        .then(([response, status]) => {
          if (status >= 200 && status <= 300) {
            resolve({ success: true, data: response });
          } else {
            resolve({ success: false, data: response });
          }
        })
        .then(([error, status]) => {
          error
            .then((err) => {
              let errorMessage = '';
              switch (status) {
                case 400:
                  errorMessage = err.message || 'Bad Request';
                  break;
                case 401:
                  errorMessage = err.message || 'Unauthorized Access';
                  break;
                case 500:
                  errorMessage = err.message || 'Internal server error';
                  break;
                default:
                  errorMessage = 'Error';
              }
              resolve({ success: false, error: errorMessage });
              throw errorMessage;
            })
            .catch((error) => {
              resolve({ success: false, error: error.message });
            });
        })
        .catch((error) => {
          resolve({ success: false, error: error.message });
        });
    };
    return new Promise(fetchPromise);
  };

  /**
   * get method
   *
   * @param {object} payload for request
   * @return {object} response
   */
  get = ({ url, headers, noheaders }) => {
    const reqParams = {
      url,
      method: 'GET',
      headers,
    };
    if (noheaders) delete reqParams.headers;
    return this.fetchHelper(reqParams);
  };

  /**
   * post method
   *
   * @param {object} payload for request
   * @return {object} response
   */
  post = ({ url, data, customHeaders }) => {

    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };
    const reqParams = {
      url,
      method: 'POST',
      headers,
      data,
    };
    return this.fetchHelper(reqParams);
  };

  filePost = ({ url, file }) => {
    const headers = {};
    const reqParams = {
      url,
      method: 'POST',
      headers,
      file,
    };
    return this.fetchHelper(reqParams);
  };

  /**
   * put method
   *
   * @param {object} payload for request
   * @return {object} response
   */
  put = ({ url, data }) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const reqParams = {
      url,
      method: 'PUT',
      headers,
      data,
    };
    return this.fetchHelper(reqParams);
  };

  patch = ({ url, data, customHeaders }) => {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };
    const reqParams = {
      url,
      method: 'PATCH',
      headers,
      data,
    };
    return this.fetchHelper(reqParams);
  };

  delete = ({ url, data }) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const reqParams = {
      url,
      method: 'DELETE',
      headers,
      data,
    };
    return this.fetchHelper(reqParams);
  };

  /**
   * Method to convert date to 'x days ago' format
   *
   * @param date
   * @return {string}
   */
  timeSinceDate = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds`;
  };

  /**
   *
   * @param email
   * @return {boolean}
   */
  validateEmail = (email) => {
    if (/^[+\w]+([.-]?[+\w]+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param phone
   * @return {boolean}
   */
  validatePhoneNumber = (phone) => {
    if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone)) {
      return true;
    }
    return false;
  }

  /**
   *
   */
  scrollToTop = () => {
    document.getElementById('scroller').scroll(0, 0);
  }
}

export default new Helpers();
