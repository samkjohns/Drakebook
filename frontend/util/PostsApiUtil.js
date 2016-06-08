var ServerActions = require('../actions/ServerActions');

var PostsApiUtil = module.exports = {
  fetchPostsForUser: function (id) {
    $.ajax({
      type: "GET",
      url: "api/users/" + id + "/posts",
      dataType: "json",
      success: ServerActions.receivePosts
    });
  }
};
