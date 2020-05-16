const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    }
},
{ timestamps: true })

module.exports = employeeSchema