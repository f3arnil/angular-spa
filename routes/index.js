/*
 * GET home page.
 */

exports.routeGetIndex = function (request, response) {
  response.render('index', {
    title: 'Express',
    content: 'That is a GET request'
  });
};

exports.routePostIndex = function (request, response) {
  response.render('index', {
    title: 'Express',
    content: 'That is a POST request'
  });
}

exports.routePutIndex = function (request, response) {
  response.render('index', {
    title: 'Express',
    content: 'That is a PUT request'
  });
}

exports.routeDeleteIndex = function (request, response) {
  response.render('index', {
    title: 'Express',
    content: 'That is a DELETE request'
  });
}
