module.exports = function (app, mongoose) {

  var User = new mongoose.Schema({
    name: {
      type: String,
      mandatory: true
    },
    password: {
      type: String,
      mandatory: true
    },
    email: {
      type: String,
      mandatory: true
    },
    permissions: {
      type: Array,
      default: [ 'VIEW_ARTICLE', 'USE_SEARCH' ]
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    },
    published: {
      type: Boolean,
      default: true
    }
  });

  return mongoose.model('User', User);
}
