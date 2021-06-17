const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: {
        type: String, 
        required:true
    },
    email: String,
    current_balance: Number,
});

module.exports = mongoose.model('Customer', CustomerSchema);