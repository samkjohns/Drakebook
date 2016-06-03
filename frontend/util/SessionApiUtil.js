var SessionConstants = require('../constants/SessionConstants'),
    SessionStore = require('../stores/SessionStore'),
    AppDispatcher = require('../dispatcher/Dispatcher'),
    Ajax = require('../util/AjaxUtil');

var SessionApiUtil = module.exports = {

  registerUser: function (user) {
    // debugger
    AppDispatcher.dispatch({
      actionType: 'LOGIN',
      currentUser: user
    });
  },

  login: function (userData) {
    $.ajax({
      type: "POST",
      url: "api/session",
      dataType: "JSON",
      data: userData,
      success: this.registerUser
    });
  },

  signup: function (userData) {
    $.ajax({
      type: "POST",
      url: "api/users",
      dataType: "JSON",
      data: userData,
      success: this.registerUser
    });
  },

  fetchCurrentUser: function (success) {
    $.ajax({
      type: 'GET',
			url: '/api/session',
			success: function (currentUser) {
			  SessionApiUtil.registerUser(currentUser)
        success && success();
			},
		});
  },

  logout: function () {
    $.ajax({
      type: "DELETE",
      url: "api/session",
      success: function (user) {
        AppDispatcher.dispatch({
          actionType: "LOGOUT"
        });
      }
    });
  }
};
