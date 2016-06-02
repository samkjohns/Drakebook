var AppDispatcher = require('../dispatcher/Dispatcher'),
    ProfileConstants = require('../constants/ProfileConstants');

var ProfileActions = module.exports = {
  receiveProfile: function (userProfile) {
    AppDispatcher.dispatch({
      actionType: ProfileConstants.USER_RECEIVED,
      profile: userProfile
    });
  }
}
