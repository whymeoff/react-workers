const express = require('express')
const passport = require('passport')
const { registerUser } = require('../controllers/user')

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send()
})

router.post('/logout', (req, res) => {
    req.logOut()
    res.send()
})

router.get('/auth', (req, res) => res.send({ isAuth: req.isAuthenticated() }))

module.exports = router