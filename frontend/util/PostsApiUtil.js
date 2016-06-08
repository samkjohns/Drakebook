var ServerActions = require('../actions/ServerActions');

var PostsApiUtil = module.exports = {
  fetchPostsForUser: function (id) {
    $.ajax({
      type: "GET",
      url: "api/users/" + id + "/posts",
      dataType: "json",
      success: ServerActions.receivePosts
    });
  },

  createPost: function (postData) {
    $.ajax({
      type: "POST",
      url: "api/posts",
      dataType: "json",
      data: postData,
      success: ServerActions.receiveSinglePost
    });
  }
};
