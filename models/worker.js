var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var workerSchema = mongoose.Schema({
  dateRegistered : { type: Date, default: Date.now },
  activeTasks : { type: [mongoose.Schema.Types.ObjectId], ref:'Task' },
  twitter : {
    id  : String,
    token : String,
    displayName : String,
    userName : String
  }
});

// generating a hash
workerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
workerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for workers and expose it to our app
module.exports = mongoose.model('Worker', workerSchema);
