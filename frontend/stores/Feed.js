var AppDispatcher = require('../dispatcher/Dispatcher.js'),
    Store = require('flux/utils').Store,
    PostConstants = require('../constants/PostConstants');

var FeedStore = new Store(AppDispatcher);
var _posts = [];


FeedStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

  }
}

window.FeedStore = FeedStore;
module.exports = FeedStore;
