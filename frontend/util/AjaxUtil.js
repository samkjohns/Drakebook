// don't use this

function _jsonify(data) {

}

var _createXHR = function (options) {
  var xhr = new XMLHttpRequest();
  xhr.open(options.type, options.url);
  xhr.onload = options.success.bind(xhr);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.setRequestHeader(
    "X-CSRF-Token",
    document.getElementsByTagName('meta')[1].getAttribute("content")
  );

  if (options.data) {
    xhr.send(JSON.stringify(options.data));
  } else {
    xhr.send();
  }
};

module.exports = _createXHR;
