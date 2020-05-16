const mongoose = require('mongoose')

const User = mongoose.model('user', require('./userSchema'))
const Employee = mongoose.model('employee', require('./employeeSchema'))

module.exports = {
    User,
    Employee
}