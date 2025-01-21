// Schema of user:

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

//---- Collection of users :
const UserCollection = mongoose.model('UserCollection',UserSchema);

module.exports = UserCollection;

