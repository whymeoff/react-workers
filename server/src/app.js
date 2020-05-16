require('dotenv').config()
require('./db/mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const FileStore = require('connect-loki')(session);

const initializePassport = require('./passportConfig')
initializePassport(passport)

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors({ credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
        maxAge: 1000*60*60*24
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/users', require('./routers/user'))
app.use('/employees', require('./routers/employee'))

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})