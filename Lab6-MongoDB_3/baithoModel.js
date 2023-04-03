const mongoose = require('mongoose');

const BaithoSchema = new mongoose.Schema({
    id:{
        type: 'Number',
        default: 0
    },
    tieude: {
        type: String,
        require: true
    },
    nam: {
        type: Number,
        default: 1900,
    },
    tacgia: {
        type: String,
    }
});

const BaithoModel = new mongoose.model('baitho', BaithoSchema);

module.exports = BaithoModel;