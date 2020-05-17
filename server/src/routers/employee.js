const express = require('express')
const { createEmployee, deleteEmployee, getEmployees, patchEmployee } = require('../controllers/employee')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.post('/', isAuth, createEmployee)
router.get('/', isAuth, getEmployees)
router.patch('/:id', isAuth, patchEmployee)
router.delete('/:id', isAuth, deleteEmployee)

module.exports = router