var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
    email : {
        type: String,
        unique: true,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

/* Creates new password on user sign up */
userSchema.methods.setPassword = function(password){
    this.saldt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');

};


/* Validates old password on login */
userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
}

module.exports = mongoose.model('User', userSchema)

