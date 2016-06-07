var ProfileConstants = require('../constants/ProfileConstants'),
    ProfileStore = require('../stores/ProfileStore'),
    ServerActions = require('../actions/ServerActions');

var ProfileApiUtil = module.exports = {
  fetchProfileInfo: function (userId) {
    $.ajax({
      type: "GET",
      url: "api/users/" + userId,
      dataType: "json",
      success: ServerActions.receiveProfile
    });
  },

  updateProfileInfo: function (profile) {
    $.ajax({
      type: "PATCH",
      url: "api/users/" + profile.id,
      dataType: "json",
      data: { user: profile },
      success: ServerActions.receiveProfile
    });
  }
};
