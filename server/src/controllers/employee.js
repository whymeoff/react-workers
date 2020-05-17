const { Employee } = require('../models/index')

const getEmployees = async (req, res) => {
    const skip = (parseInt(req.query.page) > 1) ? req.query.page * 10 - 10 : 0
    console.log
    const count = Employee.countDocuments({ fullname: { $regex: req.query.search } })
    const employees = Employee.find({ fullname: { $regex: req.query.search } })
        .skip(skip)
        .limit(10)

    const data = await Promise.all([count, employees])

    const pages = Math.ceil(data[0]/10)

    res.send({ employees: data[1], pages })
}

const createEmployee = async (req, res) => {
    const { fullname, phoneNumber, salary, position, gender } = req.body

    const employee = new Employee({ fullname, phoneNumber, salary, position, gender })

    try {
        await employee.save()
        res.status(201).send({ employee, err: null })
    } catch (err) {
        res.status(400).send({ employee: null, err })
    }
}

const patchEmployee = async (req, res) => {
    const { fullname, age, phoneNumber, salary, position } = req.body

    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id, 
            { fullname, age, phoneNumber, salary, position }, 
            { new: true }
        )

        if (!employee) {
            throw new Error({ msg: 'Can`t find employee by this ID', code: 404 })
        }

        res.send({ employee, err: null })
    } catch (err) {
        if (err.code === 404) {
            res.status(404).send({ employee: null, err: err.msg })
        } else {
            res.status(404).send({ employee: null, err: err.msg })
        }
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id)

        if (!employee) {
            throw new Error({ msg: 'Can`t find employee by this ID', code: 404 })
        }

        res.send({ employee, err: null })
    } catch (e) {
        if (err.code === 404) {
            res.status(404).send({ employee: null, err: err.msg })
        } else {
            res.status(404).send({ employee: null, err: err.msg })
        }
    }
}

module.exports = {
    deleteEmployee,
    createEmployee,
    patchEmployee,
    getEmployees
}