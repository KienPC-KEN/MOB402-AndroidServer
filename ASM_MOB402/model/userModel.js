const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    stt: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    pq: {
        type: String,
        required: true
    }
});

const UserModel = new mongoose.model('user', UserSchema);

module.exports = UserModel;