const express = require('express')
const { createEmployee, deleteEmployee, getEmployees, patchEmployee } = require('../controllers/employee')

const router = express.Router()

router.post('/', createEmployee)
router.get('/', getEmployees)
router.patch('/:id', patchEmployee)
router.delete('/:id', deleteEmployee)

module.exports = router