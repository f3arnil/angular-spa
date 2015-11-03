/*
 * GET home page.
 */

exports.getIndex = function (request, response) {
  response.render('index', {
    title: 'Express',
    content: 'That is a GET request'
  });
};

exports.postIndex = function (request, response) {
  response.render('index', {
    title: 'Express',
    content: 'That is a POST request'
  });
}

exports.putIndex = function (request, response) {
  response.render('index', {
    title: 'Express',
    content: 'That is a PUT request'
  });
}

exports.deleteIndex = function (request, response) {
  response.render('index', {
    title: 'Express',
    content: 'That is a DELETE request'
  });
}
