var AppDispatcher = require('../dispatcher/Dispatcher'),
    ProfileApiUtil = require('../util/ProfileApiUtil'),
    ProfileConstants = require('../constants/ProfileConstants');

var ProfileActions = module.exports = {
  fetchProfileInfo: function (userId) {
    ProfileApiUtil.fetchProfileInfo(userId);
  },

  updateProfileInfo: function (profile) {
    ProfileApiUtil.updateProfileInfo(profile);
  },

  updatePhoto: function (id, formData, callback) {
    ProfileApiUtil.updatePhoto(id, formData, callback);
  }
};
