const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: [true, 'Username already exists']
    },
    email: {
        type: String,
        // required: [true,'Please provide username'],
        // unique: [true,'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    fullName: String,
    phone: String,
    address: String,
    sex:String,
    picture: String,
});


userSchema.plugin(uniqueValidator);
userSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
    })

})

var User = mongoose.model("User", userSchema, "User");
module.exports = User;


