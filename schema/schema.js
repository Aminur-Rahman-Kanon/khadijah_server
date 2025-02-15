const mongoose = require('mongoose');

const bookings = new mongoose.Schema({
    date: { type: String, required: true, index: true },
    beginTime: { type: String, required: true },
    endTime: { type: String, required: true },
    service: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    details: { type: Object, require: true }
});

const orderModel = mongoose.model('bookings', bookings);

module.exports = {
    orderModel
}