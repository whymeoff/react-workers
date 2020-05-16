const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return res.status(403).send({ err: 'You need to authenticate' })
    }
}

module.exports = isAuth