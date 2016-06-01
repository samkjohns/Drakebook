var SessionConstants = require('../constants/SessionConstants'),
    Ajax = require('../util/AjaxUtil');

var SessionApiUtil = module.exports = {

  login: function (userData) {
    console.log("in login");
    $.ajax({
      type: "POST",
      url: "api/session",
      dataType: "JSON",
      data: userData,
      success: function () {
        console.log(this);
      }
    });
  },

  signup: function (userData) {
    console.log("in signup");
    $.ajax({
      type: "POST",
      url: "api/users",
      dataType: "JSON",
      data: userData,
      success: function () {
        console.log(this);
      }
    });
  }
};
