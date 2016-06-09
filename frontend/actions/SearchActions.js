var SearchApiUtil = require('../util/SearchApiUtil');

var SearchActions = module.exports = {
  searchUsers: function (query) {
    SearchApiUtil.searchUsers(query);
  }
};
