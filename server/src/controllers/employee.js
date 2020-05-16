const { Employee } = require('../models/index')

const getEmployees = async (req, res) => {
    const employees = await Employee.find()

    res.send({ employees })
}

const createEmployee = async (req, res) => {
    const { fullname, age, phoneNumber, salary, position } = req.body

    const employee = new Employee({ fullname, age, phoneNumber, salary, position })

    try {
        await employee.save()
        res.send({ employee, err: null })
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