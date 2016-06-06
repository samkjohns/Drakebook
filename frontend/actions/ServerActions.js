var AppDispatcher = require('../dispatcher/Dispatcher');

var ServerActions = module.exports = {
  undrake: function (fullDrakeship) {
    AppDispatcher.dispatch({
      actionType: 'UNDRAKE',
      fullDrakeship: fullDrakeship
    });
  },

  addDrake: function (fullDrakeship) {
    AppDispatcher.dispatch({
      actionType: "ADD_DRAKE",
      fullDrakeship: fullDrakeship
    });
  }
};
