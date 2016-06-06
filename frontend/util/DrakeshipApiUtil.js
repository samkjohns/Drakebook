var ServerActions = require('../actions/ServerActions');

var DrakeshipApiUtil = module.exports = {

  undrake: function (userId, drakeId) {
    var url = "api/drakeships/" + userId + "/undrake/" + drakeId

    $.ajax({
      type: 'GET',
      url: url,
      dataType: "json",
      success: ServerActions.undrake
    });
  },

  requestDrake: function (userId, drakeId) {
    $.ajax({
      type: "POST",
      url: "api/drakeships",
      data: {
        drakeship: {
          recipient_id: drakeId
        }
      },
      dataType: "json",
      success: ServerActions.addDrake
    });
  }
};
