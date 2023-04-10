const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    stt: {
        type: Number,
        default: 0
    },
    masp: {
        type: String,
        required: true
    },
    tensp: {
        type: String,
        required: true
    },
    dongia: {
        type: Number,
        default: 1000,
        required: true
    },
    hinhanh: {
        type: String,
        required: true
    },
    mausac:{
        type: String,
        required: true
    },
    loaisp:{
        type: String,

    }
});

const ProductModel = new mongoose.model('product', ProductSchema);

module.exports = ProductModel;