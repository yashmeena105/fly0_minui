import Helpers from '../Config/helpers';
import paths from './apiConstants'

/**
 * @param payload
 */
/* eslint class-methods-use-this: ["error", { "enforceForClassFields": false }] */
class UserService {

  addNotificationToken = async () => {
    const token = localStorage.getItem("notificationToken");
    const response = await Helpers.post({
      url: `${paths.notificationToken}`,
      data: { token }
    });
    return response;
  }

  getMyProfile = async () => {
    const response = await Helpers.get({
      url: `${paths.profile}`,
    });
    return response;
  }

  createMyProfile = async (payload) => {
    const response = await Helpers.post({
      url: `${paths.profile}`,
      data: payload
    });
    return response;
  }

  updateMyProfile = async (payload) => {
    const response = await Helpers.put({
      url: `${paths.profile}`,
      data: payload
    });
    return response;
  }


  updateCompany = async (payload) => {
    const response = await Helpers.put({
      url: `${paths.updateCompanyDetail}`,
      data: payload
    });
    return response;
  }

  updateCompanyLogo = async (payload) => {
    const response = await Helpers.put({
      url: `${paths.companyLogo}`,
      data: payload
    });
    return response;
  }

  getCompanyMembers = async () => {
    const response = await Helpers.get({
      url: `${paths.getCompanyMembers}`,
    });
    return response;
  }

}
export default new UserService();
