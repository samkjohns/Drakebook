var AppDispatcher = require('../dispatcher/Dispatcher.js'),
    Store = require('flux/utils').Store,
    ProfileConstants = require('../constants/ProfileConstants');

var ProfileStore = new Store(AppDispatcher);
_profile = {};
_profileHasBeenFetched = false;

ProfileStore.profileHasBeenFetched = function () {
  return _profileHasBeenFetched;
};

ProfileStore.profile = function () {
  var dup = {};
  Object.keys(_profile).forEach(function (key) {
    dup[key] = _profile[key];
  })
  return dup;
};

ProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ProfileConstants.USER_RECEIVED:
      // debugger
      _profile = payload.profile;
      _profileHasBeenFetched = true;
      ProfileStore.__emitChange();
      break;
  }
};

window.ProfileStore = ProfileStore;
module.exports = ProfileStore;
