var AppDispatcher = require('../dispatcher/Dispatcher.js'),
    Store = require('flux/utils').Store,
    PostConstants = require('../constants/PostConstants');

var PostsStore = new Store(AppDispatcher);

// OPTION 1:
// Keys of ':postableId|:postableType' --> [array of posts]
// eg.
//   "2|User":
//      [|post1|, |post2|, |post3| ... ]
//   "1|Post":
//      [|post4|, |post5|, |post6| ... ]


// OPTION 2:
//  _posts is an array
//  each entry in posts is an object
//  entry object: {
//    postId: :postId
//    postContent: :postContent
//    comments: [array of posts]
//  }

// --- CODE FOR OPTION 2 ---
var _posts = [];

PostsStore.posts = function () { return _posts.slice().reverse(); };

PostsStore.commentsForPost = function (id) {
  for (var i = 0; i < _posts.length; i++) {
    if (_posts[i].id === id) {
      return _posts[i].comments;
    }
  }
  return null;
}

function addOrUpdatePost (post) {
  for (var i = 0; i < _posts.length; i++) {
    if (_posts[i].id === post.id) {
      _posts[i] = post;
      return i;
    }
  }

  _posts.push(post);
  return -1;
}

function addOrUpdateComment (comment) {
  function _addOrUpdateToPost (post, comment) {
    for (var i = 0; i < post.comments.length; i++) {
      if (post.comments[i].id === comment.id) {
        post.comments[i] = comment;
        return i;
      }
    }

    post.comments.push(comment);
  }

  for (var i = 0; i < _posts.length; i++) {
    if (_posts[i].id === comment.postable.id) {
      _addOrUpdateToPost(_posts[i], comment);
      return i;
    }
  }

  return -1;
}

function removePost (post) {
  for (var i = 0; i < _posts.length; i++) {
    if (_posts[i].id === post.id) {
      _posts.splice(i, 1);
      return i;
    }
  }
  return -1;
}

function removeComment (comment) {
  function _removeCommentFromPost (post, comment) {
    for (var i = 0; i < post.comments.length; i++) {
      if (post.comments[i].id === comment.id) {
        post.comments.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  for (var i = 0; i < _posts.length; i++) {
    if (_posts[i].id === comment.postable.id) {
      if (_removeCommentFromPost(_posts[i], comment)){
        return i;
      } return -1;
    }
  }

  return -1;
}

PostsStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
      case PostConstants.POSTS_RECEIVED:
        _posts = payload.index;
        PostsStore.__emitChange();
        break;

      case PostConstants.ADD_POST:
        if (payload.post.postable.type === "User") {
          addOrUpdatePost(payload.post);
        } else {
          addOrUpdateComment(payload.post);
        }
        PostsStore.__emitChange();
        break;

      case PostConstants.REMOVE_POST:
        if (payload.post.postable.type === "User") {
          removePost(payload.post);
        } else {
          removeComment(payload.post);
        }
        PostsStore.__emitChange();
        break;
    }
};

module.exports = PostsStore;
