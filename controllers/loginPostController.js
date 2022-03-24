const bcrypt = require('bcrypt')
const User = require('../models/user')
module.exports = (req, res) => {
        const { username, password } = req.body;
        User.findOne({ username: username }, (error, user) => {
                if (user) {
                        bcrypt.compare(password, user.password, (error, same) => {
                                if (same) {
                                        req.session.userId = user._id// if passwords match
                                        // // store user session
                                        req.isAuthenticated = true
                                        res.redirect('/dashboard')
                                }
                                else {
                                        const validationErrors = ['Password is incorrect']
                                        req.flash('validationErrors', validationErrors)
                                        res.redirect('/login')
                                }
                        })
                }
                else {
                        const validationErrors = ['Username is incorrect']
                        req.flash('validationErrors', validationErrors)
                        req.flash('data', req.body)
                        res.redirect('/login')
                }
        }
        )
}




