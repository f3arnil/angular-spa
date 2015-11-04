module.exports = function (app, mongoose) {

  var model = require('./User.js')(app, mongoose);

  function getModel() {
    return model;
  }

  return {
    getModel: getModel,
  };
}