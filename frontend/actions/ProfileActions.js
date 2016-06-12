var AppDispatcher = require('../dispatcher/Dispatcher'),
    ProfileApiUtil = require('../util/ProfileApiUtil'),
    ProfileConstants = require('../constants/ProfileConstants');

var ProfileActions = module.exports = {
  // receiveProfile: function (userProfile) {
  //   AppDispatcher.dispatch({
  //     actionType: ProfileConstants.USER_RECEIVED,
  //     profile: userProfile
  //   });
  // },

  fetchProfileInfo: function (userId) {
    ProfileApiUtil.fetchProfileInfo(userId);
  },

  updateProfileInfo: function (profile) {
    // debugger
    ProfileApiUtil.updateProfileInfo(profile);
  }
};
