var SessionConstants = require('../constants/SessionConstants'),
    SessionStore = require('../stores/SessionStore'),
    AppDispatcher = require('../dispatcher/Dispatcher'),
    Ajax = require('../util/AjaxUtil');

var SessionApiUtil = module.exports = {

  registerUser: function (user) {
    AppDispatcher.dispatch({
      actionType: 'LOGIN',
      currentUser: user
    });
  },

  registerErrors: function (errors) {
    AppDispatcher.dispatch({
      actionType: "ERRORS_RECEIVED",
      errors: errors
    });
  },

  login: function (userData) {
    $.ajax({
      type: "POST",
      url: "api/session",
      dataType: "JSON",
      data: userData,
      success: this.registerUser,
      error: function (response) {
        SessionApiUtil.registerErrors({
          login: response.responseJSON.base
        });
      }
    });
  },

  signup: function (userData) {
    $.ajax({
      type: "POST",
      url: "api/users",
      dataType: "JSON",
      data: userData,
      success: this.registerUser,
      error: function (response) {
        SessionApiUtil.registerErrors({
          signup: response.responseJSON.errors
        });
      }
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
