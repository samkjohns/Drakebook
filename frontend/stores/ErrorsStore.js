var AppDispatcher = require('../dispatcher/Dispatcher.js'),
    Store = require('flux/utils').Store;


var ErrorsStore = new Store(AppDispatcher);
var _errors = {};

// type is either "login" or "signup"
ErrorsStore.messages = function (type) {
  return _errors[type] ? _errors[type].slice() : [];
};

ErrorsStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "ERRORS_RECEIVED":
      _errors = payload.errors;
      ErrorsStore.__emitChange();
      break;
  }
};

module.exports = ErrorsStore;
