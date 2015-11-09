exports.getWebsiteHome = function (request, response) {
  response.render('js/search-app/index.jade', {
    backEndData: 'That is a message from Backend'
  });
}
