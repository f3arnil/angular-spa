/**
 * Implements routes:
 * GET /user/getapi - get API info
 * GET /users - get list of users
 * GET /user/:id - get user by ID
 * POST /user/create - create an user
 * POST /user/update/:id - update existing user
 * GET /user/delete/:id - delete user
 *
 * @param app
 * @param mongoose
 * @returns {{getModel: getModel}}
 */

module.exports = function (app, mongoose) {

  var model = require('./User.js')(app, mongoose);

  // Returns a list of api functions
  app.get('/user/getapi', function (request, response) {
    var operationName = 'get user api';
    var defaultUserFields = Object.keys(model.schema.tree);

    return response.send({
      create: {
        type: 'PUT',
        url: '/user/create',
        fields: defaultUserFields
      },
      read: {
        type: 'GET',
        url: '/user/:id',
        fields: []
      },
      update: {
        type: 'POST',
        url: '/user/:id/update',
        fields: defaultUserFields
      },
      delete: {
        type: 'DELETE',
        url: '/user/:id/delete',
        fields: []
      },
      getAll: {
        type: 'GET',
        url: '/users',
        fields: []
      }
    });
  })

  // Returns user by unique identifier
  app.get('/user/:id', function (request, response) {
    var id = request.params.id;
    var operationName = 'get user';

    return model.findById(id, function (error, data) {
      if (!error) {
        // Users found
        return response.send({
          operation: operationName,
          status: 'ok',
          error: null,
          data: data
        });
      }

      // Error on searching
      return response.send({
        operation: operationName,
        status: 'error',
        error: error,
        data: {}
      });
    });
  });

  // Returns a list of users
  app.get('/users', function (request, response) {
    var operationName = 'list users';

    return model.find(function (error, data) {
      if (!error) {
        // User found
        return response.send({
          operation: operationName,
          status: 'ok',
          error: null,
          data: data
        });
      }

      // Error on searching
      return response.send({
        operation: operationName,
        status: 'error',
        error: error,
        data: {}
      });
    });
  });

  // Creates a new user
  app.put('/user/create', function (request, response) {
    var operationName = 'create user';
    var fields = {};

    // Look first schema fields instead request fields for guarantee filling all mandatory
    for (var treeItemName in model.schema.tree) {
      // Skip fields
      if (treeItemName == 'id' || treeItemName == '_id' || treeItemName == '__v') {
        continue;
      }
      var currentTreeNode = model.schema.tree[treeItemName];

      // Check if current schema field presents in request
      if (request.body.hasOwnProperty(treeItemName)) {

        // Check if it is mandatory field
        if (currentTreeNode.hasOwnProperty('mandatory') && currentTreeNode.mandatory == true) {

          // If mandatory field is empty return error
          if (request.body[treeItemName].length == 0) {
            return response.send({
              operation: operationName,
              status: 'error',
              error: 'Field ' + treeItemName + ' is mandatory',
              data: {}
            });
          }
        }

        fields[treeItemName] = request.body[treeItemName];
      }
    }

    var user = new model(fields);

    user.save(function(error) {
      if (!error) {
        // User saved
        return response.send({
          operation: operationName,
          status: 'ok',
          error: null,
          data: {}
        });
      }

      // Error on saving
      return response.send({
        operation: operationName,
        status: 'error',
        error: error,
        data: {}
      });
    });
  });

  // Updated existing user
  app.post('/user/:id/update', function (request, response) {
    var operationName = 'update user';
    var id = request.params.id;

    // Find item by id
    return model.findById(id, function (error, data) {
      if (!error) {

        // Fill fields according returned
        for (var originalFieldName in data) {

          // Skip fields
          if (originalFieldName == 'id' || originalFieldName == '_id' || originalFieldName == '__v') {
            continue;
          }

          if (request.body.hasOwnProperty(originalFieldName)) {
            data[originalFieldName] = request.body[originalFieldName];
          }
        }

        data.updated = Date.now();

        // Request saving
        return data.save(function (error) {
          if (!error) {
            // Response when the entity has been saved
            return response.send({
              operation: operationName,
              status: 'ok',
              error: null,
              data: data
            })
          }

          // Response when saving has been fault
          return response.send({
            operation: operationName,
            status: 'error',
            error: error,
            data: {}
          });
        })
      }

      // Undefined error
      return response.send({
        operation: operationName,
        status: 'error',
        error: error,
        data: {}
      });
    });
  });

  // Deleting existing user
  app.delete('/user/:id/delete', function (request, response) {
    var operationName = 'delete user';
    var id = request.params.id;

    // Find item by id
    return model.findById(id, function (error, data) {
      return data.remove(function (error) {
        if (!error) {
          // User removed
          return response.send({
            operation: operationName,
            status: 'ok',
            error: null,
            data: null
          });
        }

        // Error on removinfg
        return response.send({
          operation: operationName,
          status: 'error',
          error: error,
          data: null
        });
      });
    });
  });

  function getModel() {
    return model;
  }

  return {
    getModel: getModel,
  };
}
