var PostsApiUtil = require('../util/PostsApiUtil');

var PostsActions = module.exports = {
  fetchPostsForUser: function (id) {
    PostsApiUtil.fetchPostsForUser(id);
  },

  createPost: function (post) {
    PostsApiUtil.createPost(post);
  },

  removePost: function (postId) {
    PostsApiUtil.removePost(postId);
  },

  updatePost: function (post) {
    PostsApiUtil.updatePost(post);
  },

  fetchFeedForUser: function (id) {
    PostsApiUtil.fetchFeedForUser(id);
  }
};
