var ServerActions = require('../actions/ServerActions');

var DrakeshipApiUtil = module.exports = {

  undrake: function (userId, drakeId) {
    var url = "api/drakeships" + userId + "/undrake/" + drakeId

    $.ajax({
      type: 'DELETE',
      url: url,
      dataType: "json",
      success: function (drakeship) {

      }
    });
  }
};
