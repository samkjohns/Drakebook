var ProfileConstants = require('../constants/ProfileConstants'),
    ProfileStore = require('../stores/ProfileStore'),
    ProfileActions = require('../actions/ProfileActions'),
    AppDispatcher = require('../dispatcher/Dispatcher');

var ProfileApiUtil = module.exports = {
  fetchProfileInfo: function (userId) {
    $.ajax({
      type: "GET",
      url: "api/users/" + userId,
      dataType: "json",
      success: ProfileActions.receiveProfile
    });
  }
};
