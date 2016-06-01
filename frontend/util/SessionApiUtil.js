var SessionConstants = require('../constants/SessionConstants'),
    SessionStore = require('../stores/SessionStore'),
    AppDispatcher = require('../dispatcher/Dispatcher'),
    Ajax = require('../util/AjaxUtil');

var SessionApiUtil = module.exports = {

  registerLogin: function (user) {
    AppDispatcher.dispatch({
      actionType: 'LOGIN',
      user: user
    });
  },

  login: function (userData) {
    $.ajax({
      type: "POST",
      url: "api/session",
      dataType: "JSON",
      data: userData,
      success: this.registerLogin
    });
  },

  signup: function (userData) {
    $.ajax({
      type: "POST",
      url: "api/users",
      dataType: "JSON",
      data: userData,
      success: this.registerLogin
    });
  },

  fetchCurrentUser: function (success) {
    $.ajax({
			url: '/api/session',
			method: 'GET',
			success: function (currentUser) {
			  SessionActions.receiveCurrentUser(currentUser);
        success && success();
			},
		});
  }
};
