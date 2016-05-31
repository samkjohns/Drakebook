var _createXHR = function (options) {
  var xhr = new XMLHttpRequest();
  xhr.open(options.type, options.url);
  xhr.onload = options.success.bind(xhr);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader(
    "X-CSRF-Token",
    document.getElementsByTagName('meta')[1].getAttribute("content")
  );

  if (options.data) {
    // return xhr.send.bind(xhr, JSON.stringify(options.data));
    // debugger
    xhr.send(options.data);
  } else {
    // return xhr.send.bind(xhr);
    xhr.send();
  }
};

module.exports = _createXHR;
