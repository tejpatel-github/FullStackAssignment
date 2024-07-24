const User = require('../models/G2')

module.exports = {
    ensureAuthenticated: (req, res, next) => {

        if (!loggedIn) {
            return res.redirect("/login")
        }
        next()
    },
    ensureDriver: (req, res, next) => {
        if (userType === 'Driver') {
            return next();
        }
        res.status(403).send('Access Denied: Only drivers can access this page.');
    },
    ensureAdmin: (req, res, next) => {
        if (userType === 'Admin') {
            return next();
        }
        res.status(403).send('Access Denied: Only admins can access this page.');
    }
}