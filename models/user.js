var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var bcrypt   = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
    name             : {
        first        : { type: String, default: "John"},
        last         : { type: String, default: "Doe"},
    },
    dateRegistered   : { type: Date, default: Date.now },
    status           : { type: String, default: "new"},    
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
