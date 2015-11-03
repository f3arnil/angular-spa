exports.getWebsiteHome = function (request, response) {
  response.render(__dirname + '/views/index.jade', {
    title: 'Express',
    content: 'That is a GET request'
  });
}

exports.postWebsiteHome = function (request, response) {
  response.render(__dirname + '/views/index.jade', {
    title: 'Express',
    content: 'That is a POST request'
  });
}

exports.putWebsiteHome = function (request, response) {
  response.render(__dirname + '/views/index.jade', {
    title: 'Express',
    content: 'That is a PUT request'
  });
}

exports.deleteWebsiteHome = function (request, response) {
  response.render(__dirname + '/views/index.jade', {
    title: 'Express',
    content: 'That is a DELETE request'
  });
}
