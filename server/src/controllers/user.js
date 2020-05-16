const bcrypt = require('bcryptjs')
const { User } = require('../models/index')

const registerUser = async (req, res) => {
    const { username, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = new User({ username, email, password: hashedPassword })

    try {
        await user.save()
        res.status(201).send({ err: null })
    } catch (err) {
        res.status(400).send({ err })
    }
}

module.exports = {
    registerUser
}