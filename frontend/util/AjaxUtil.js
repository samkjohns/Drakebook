var _createXHR = function (options) {
  var xhr = new XMLHTTPRequest();
  xhr.open(options.type, options.url);
  xhr.onload = options.success.bind(xhr);

  if (options.data) {
    return xhr.send.bind(xhr, JSON.parse(options.data));
  } else {
    return xhr.send.bind(xhr);
  }
};

module.exports = _createXHR;
