import Helpers from '../Config/helpers';
import paths from './apiConstants'

/**
 * @param payload
 */
class UserService {

  static addNotificationToken = async () => {
    const token = localStorage.getItem("notificationToken");
    const response = await Helpers.post({
      url: `${paths.notificationToken}`,
      data: { token }
    });
    return response;
  }

  static getMyProfile = async () => {
    const response = await Helpers.get({
      url: `${paths.profile}`,
    });
    return response;
  }

  static createMyProfile = async (payload) => {
    const response = await Helpers.post({
      url: `${paths.profile}`,
      data: payload
    });
    return response;
  }

  static updateMyProfile = async (payload) => {
    const response = await Helpers.put({
      url: `${paths.profile}`,
      data: payload
    });
    return response;
  }


  static updateCompany = async (payload) => {
    const response = await Helpers.put({
      url: `${paths.updateCompanyDetail}`,
      data: payload
    });
    return response;
  }

  static updateCompanyLogo = async (payload) => {
    const response = await Helpers.put({
      url: `${paths.companyLogo}`,
      data: payload
    });
    return response;
  }

  static getCompanyMembers = async () => {
    const response = await Helpers.get({
      url: `${paths.getCompanyMembers}`,
    });
    return response;
  }


}
export default new UserService();
