var AppDispatcher = require('../dispatcher/Dispatcher');

var ErrorActions = module.exports = {
  errorMessage: function (type, message) {
    errors = {};
    errors[type] = [message];
    AppDispatcher.dispatch({
      actionType: "ERRORS_RECEIVED",
      errors: errors
    });
  }
};
