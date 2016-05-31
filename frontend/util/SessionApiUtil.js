var SessionConstants = require('../constants/SessionConstants'),
    Ajax = require('../util/AjaxUtil');

var SessionApiUtil = module.exports = {

  login: function (userData) {
    var request = Ajax({
      type: "POST",
      url: "api/session",
      data: {
        user: {
          username: "testthing",
          password: "password"
        }
      },
      success: function () {
        console.log(this);
      }
    });
    // debugger
    // request();
  },

  signup: function (userData) {

  }
};
