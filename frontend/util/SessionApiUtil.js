var SessionConstants = require('../constants/SessionConstants'),
    Ajax = require('../util/AjaxUtil');

var SessionApiUtil = module.exports = {

  login: function (userData) {
    var request = Ajax({
      type: "POST",
      url: "api/session",
      data: userData,
      success: function () {
        console.log(this);
      }
    });
    request();
  },

  signup: function (userData) {

  }
};
