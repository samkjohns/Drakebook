var SessionConstants = require('../constants/SessionConstants'),
    SessionApiUtil = require('../util/SessionApiUtil'),
    AppDispatcher = require('../dispatcher/Dispatcher')

var SessionActions = module.exports = {

  login: function (userData) {
    SessionApiUtil.login({user: userData});
  },

  signup: function (userData) {
    SessionApiUtil.signup({user: userData});
  },

  logout: function () {
    SessionApiUtil.logout();
  }
};
