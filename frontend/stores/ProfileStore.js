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
  });
  return dup;
};

function removeFromDrakeships(toRemove) {
  var drakeIndex = _profile.drakeships.findIndex(function (drake) {
    return drake.username === toRemove.username;
  });

  if (drakeIndex >= 0) { _profile.drakeships.splice(drakeIndex, 1); }
}

function updateDrakeships(fullDrakeship) {
  if (fullDrakeship.user.id === _profile.id) {
    _profile = fullDrakeship.user;

  } else if (fullDrakeship.drake.id === _profile.id) {
    _profile = fullDrakeship.drake;
  }
}

function undrake(fullDrakeship) {
  if (_profileHasBeenFetched) {
    var requester = fullDrakeship.requester;
    var recipient = fullDrakeship.recipient;
    if (_profile.username === requester.username) {
      removeFromDrakeships(recipient);
    } else if (_profile.username === recipient.username) {
      removeFromDrakeships(requester);
    }
  }
};

ProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

    case ProfileConstants.USER_RECEIVED:
      _profile = payload.profile;
      _profileHasBeenFetched = true;
      ProfileStore.__emitChange();
      break;

    case 'ADD_DRAKE':
      updateDrakeships(payload.fullDrakeship);
      ProfileStore.__emitChange();
      break;

    case 'UNDRAKE':
      updateDrakeships(payload.fullDrakeship);
      ProfileStore.__emitChange();
      break;

  }
};

window.ProfileStore = ProfileStore;
module.exports = ProfileStore;
