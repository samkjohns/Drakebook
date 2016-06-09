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
  },

  removePost: function (postId) {
    $.ajax({
      type: "DELETE",
      url: "api/posts/" + postId,
      dataType: "json",
      success: ServerActions.removeSinglePost
    });
  },

  updatePost: function (post) {
    $.ajax({
      type: "PATCH",
      url: "api/posts/" + post.id,
      dataType: "json",
      data: {
        post: {body: post.body}
      },
      success: ServerActions.receiveSinglePost
    });
  },

  fetchFeedForUser: function (id) {
    console.log("ApiUtil: fetching feed for user");
    $.ajax({
      type: "GET",
      url: "api/feed",
      dataType: "json",
      success: ServerActions.receivePosts
    });
  }
};
