const mongoose = require('mongoose');
const uniqueValidator = requre('mongoose-unique-validator');

const userShema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userShema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userShema);