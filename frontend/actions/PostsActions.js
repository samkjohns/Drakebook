var PostsApiUtil = require('../util/PostsApiUtil');

var PostsActions = module.exports = {
  fetchPostsForUser: function (id) {
    PostsApiUtil.fetchPostsForUser(id);
  }
};
