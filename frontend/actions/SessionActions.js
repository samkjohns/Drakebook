var SessionConstants = require('../constants/SessionConstants'),
    SessionApiUtil = require('../util/SessionApiUtil');

var SessionActions = module.exports = {

  login: function (userData) {
    console.log("logging in");
    SessionApiUtil.login({user: userData});
  },

  signup: function (userData) {
    console.log("signing up");
    SessionApiUtil.signup({user: userData});
  }
};
