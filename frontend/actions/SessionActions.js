var SessionConstants = require('../constants/SessionConstants'),
    SessionApiUtil = require('../util/SessionApiUtil');

var SessionActions = module.exports = {

  login: function (userData) {
    SessionApiUtil.login(userData);
  },

  signup: function (userData) {
    SessionApiUtil.signup(userData);
  }
};
