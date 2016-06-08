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

PostsStore.posts = function () { return _posts.slice(); };



PostsStore.__onDispatch = function (payload) {
  // debugger
  switch (payload.actionType) {
      case PostConstants.POSTS_RECEIVED:
        _posts = payload.index;
        PostsStore.__emitChange();
        break;

      case PostConstants.POST_ADDED:
        PostsStore.__emitChange();
        break;

      case PostConstants.POST_REMOVED:
        PostsStore.__emitChange();
        break;
    }
};

// --- CODE FOR OPTION 1 ---
// _posts = {};
// function _keyFor (postable) {
//   return postable.id + "|" + postable.postableType;
// }
//
// function _getPosts (payload) {
//   var postIndex = payload.postIndex;
//   return _posts[_keyFor(postIndex.postable)];
// }
//
// PostsStore.posts = function (postable) {
//   return _posts[_keyFor(postable)].slice();
// };
//
//
//
// function _removePost (posts, postId) {
//   for (var i = 0; i < posts.length; i++) {
//     if (posts[i].id === postId) {
//       posts.splice(i, 1);
//       return true;
//     }
//   }
//   return false;
// }

// PostsStore.__onDispatch = function (payload) {
//   switch (payload.actionType) {
//     /*
//     payload: {
//       actionType: PostConstants.POSTS_RECEIVED,
//
//       postIndex: {
//         postable: {
//           postableId: :postableId,
//           postableType: :postableType
//         },
//
//         posts: [array of posts]
//       }
//     }
//     */
//     case PostConstants.POSTS_RECEIVED:
//       var postIndex = payload.postIndex;
//       _posts[_keyFor(postIndex.postable)] = postIndex.posts;
//       PostsStore.__emitChange();
//       break;
//
//       /*
//       payload: {
//         actionType: PostConstants.POSTS_ADDED,
//
//         post: {
//           postableId: :postableId,
//           postableType: :postableType,
//           (other post content)
//         }
//       }
//       */
//     case PostConstants.POST_ADDED:
//       var posts = _posts[_keyFor(payload.postable)];
//       posts.push(payload.post);
//       PostsStore.__emitChange();
//       break;
//
//     case PostConstants.POST_REMOVED:
//       var posts = _posts[_keyFor(payload.postable)];
//       _removePost(posts, payload.post.id);
//       PostsStore.__emitChange();
//       break;
//   }
// };

window.PostsStore = PostsStore;
module.exports = PostsStore;
