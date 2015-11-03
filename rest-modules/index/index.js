module.exports = function(app) {
  // Defining routes
  var routes = require('./routes.js');

  app.get('/', routes.getWebsiteHome);
  app.post('/', routes.postWebsiteHome);
  app.put('/', routes.putWebsiteHome);
  app.delete('/', routes.deleteWebsiteHome);
}
