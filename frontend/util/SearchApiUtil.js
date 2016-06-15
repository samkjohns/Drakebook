var ServerActions = require('../actions/ServerActions');

var SearchApiUtil = module.exports = {
  searchUsers: function (query) {
    $.ajax({
      type: "GET",
      url: "api/search",
      dataType: "json",
      data: {search: {query: query}},
      success: ServerActions.receiveSearchResults
    });
  }
};
