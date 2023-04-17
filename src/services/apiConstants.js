
const paths = {
  notificationToken: "/user/notification-token",
  getDestinations: "/public/get-destinations",

  customer: "/company/customers",
  lead: "/leads",
  query: "/query",

  getMyProfile: "/user/get-my-profile",
  profile: "/user/profile",
  getCompanyDetail: "/company/get-company-details",
  updateCompanyDetail: "/company/update",
  companyLogo: "/company/logo",
  libraryAsset: "/asset/library/public",
  uploadComponentAsset: "/asset/component/upload",
  getCompanyMembers: '/company/members',

  vendor: `/company/vendor`,

  masterActivity: "/company/master/activity",
  masterVisa: "/company/master/visa",
  masterStay: "/company/master/stay",
  masterTransport: "/company/master/transport",

  itinerary: "/itinerary",
  itineraryDay: "/itinerary/day",
  dayActivity: "/itinerary/day-activity",
  dayStay: "/itinerary/day-stay",
  dayFlight: "/itinerary/day-flight",
  dayTransport: "/itinerary/day-transport",
  dayVisa: "/itinerary/day-visa",
  itineraryComponents: "/itinerary/components",

  proposal: "/itinerary/proposal",

  dayComponent: "/itinerary/day/component",

  confirmItinerary: "/itinerary/confirm",

  marketplaceVendorLead: "/leads/marketplace/request",

  chatrooms: "/leads/chatrooms",
  querychatrooms: "/query/chatrooms",
  notification: "/notification",
  messageNotification: "/notification/message",
};
export default paths;

export const errors = {
  no_of_days: "no of days is Required",
  phone_number: "phone_number  is Required",
  email: "email address is Required",
};
