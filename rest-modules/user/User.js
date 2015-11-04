module.exports = function (app, mongoose) {

  var User = new mongoose.Schema({
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String
    },
    permissions: {
      type: Array,
      default: [ 'read book', 'search book' ]
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
