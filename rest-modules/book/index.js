module.exports = function (app, mongoose) {

  var model = require('./Book.js')(app, mongoose);

  function getModel() {
    return model;
  }

  return {
    getModel: getModel,
  };
}
