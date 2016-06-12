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

  _filterFields: function (profile) {
    var excepted = [
      "id", "drakeships", "session_token", "password",
      "password_digest", "uid", "pendingDrakeships"
    ];

    var filteredProfile = {};
    Object.keys(profile).forEach(function (key) {
      if (excepted.indexOf(key) < 0) {
        filteredProfile[key] = profile[key];
      }
    }.bind(this));

    return filteredProfile;
  },

  updateProfileInfo: function (profile) {
    debugger
    $.ajax({
      type: "PATCH",
      url: "api/users/" + profile.id,
      dataType: "json",
      data: { user: ProfileApiUtil._filterFields(profile) },
      success: ServerActions.receiveProfile
    });
  }
};
