/**
 * Implements routes:
 * /users - get list of users
 * /user/id/:id - get user by ID
 * 
 * @param app
 * @param mongoose
 * @returns {{getModel: getModel}}
 */

module.exports = function (app, mongoose) {

  var model = require('./User.js')(app, mongoose);

  // Returns user by unique identifier
  app.get('/user/id/:id', function (request, response) {
    var id = request.params.id;

    return model.findById(id, function (error, data) {
      if (!error) {
        return response.send(data);
      }

      return console.log(error);
    });
  });

  // Returns a list of users
  app.get('/users', function (request, response) {
    return model.find(function (error, data) {
      if (!error) {
        return response.send(data);
      }

      return console.log(error);
    });
  });

  function getModel() {
    return model;
  }

  return {
    getModel: getModel,
  };
}
