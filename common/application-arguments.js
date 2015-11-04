module.exports = function() {
  var applicationArguments = {
    environment: ''
  };

  // Walk through sent arguments
  process.argv.forEach(function (value) {

    // Check for NODE_ENV argument that used for defining running environment
    var environment = /NODE_ENV=(.+)$/.exec(value);

    if (environment) {
      applicationArguments.environment = environment[1];
    }
  });

  return applicationArguments;
}
