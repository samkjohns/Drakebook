var AppDispatcher = require('../dispatcher/Dispatcher'),
    ProfileConstants = require('../constants/ProfileConstants');

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
  },

  receiveProfile: function (userProfile) {
    AppDispatcher.dispatch({
      actionType: ProfileConstants.USER_RECEIVED,
      profile: userProfile
    });
  }
};
