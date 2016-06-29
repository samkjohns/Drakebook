var AppDispatcher = require('../dispatcher/Dispatcher.js'),
    Store = require('flux/utils').Store;

var SessionStore = new Store(AppDispatcher);

var _currentUser = {};
var _currentUserHasBeenFetched = false;

function _login(currentUser) {
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
}

function _logout() {
  _currentUser = {};
  _currentUserHasBeenFetched = true;
}

function _setErrors(errors) {
  _currentUserHasBeenFetched = false;
  _currentUser = {};
}

function updateDrakeships(fullDrakeship) {
  if (fullDrakeship.user.id === _currentUser.id) {
    _currentUser = fullDrakeship.user;

  } else if (fullDrakeship.drake.id === _currentUser.id) {
    _currentUser = fullDrakeship.drake;
  }
}

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {

    case "LOGIN":
      _login(payload.currentUser);
      SessionStore.__emitChange();
      break;

    case "LOGOUT":
    	_logout();
      SessionStore.__emitChange();
      break;

    case "ADD_DRAKE":
      updateDrakeships(payload.fullDrakeship);
      SessionStore.__emitChange();
      break;

    case "UNDRAKE":
      updateDrakeships(payload.fullDrakeship);
      SessionStore.__emitChange();
      break;

  }
};


SessionStore.currentUser = function () {
  return $.extend({}, _currentUser);
};


SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = function () {
  return !$.isEmptyObject(_currentUser);
};

SessionStore.isDrakesWith = function (profile) {
  return _currentUser.drakeships.find(function (drake) {
    return drake.id === profile.id;
  });
};

window.SessionStore = SessionStore;

module.exports = SessionStore;
