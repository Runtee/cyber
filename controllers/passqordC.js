const User = require('../models/user.js')
const bcrypt = require('bcrypt')
module.exports = async (req, res) => {
    const password = req.body.password;
    const newPassword = req.body.npassword;
    const Confirmpassword = req.body.cpassword;
    var id = req.session.userId
        bcrypt.hash(newPassword, 10, (e, newhash) => {
            User.findById(id, (error, user) => {
                if (user) {
                    bcrypt.compare(password, user.password, (error, same) => {
                        if (same) {
                            if (newPassword === Confirmpassword) {
                                // var usr = bcrypt.hash(newPassword, 10)
                                User.findByIdAndUpdate(id, { 'password': newhash }, (err, upd) => {
                                    if (upd) {
                                        req.flash('success', 'Password successfuly changed')
                                        res.redirect('/change-password')
                                    }
                                });

                            }
                            else {
                                const validationErrors = ['confirm password is not the same with new password']
                                req.flash('error', validationErrors)
                                req.flash('data', req.body)
                                res.redirect('/change-password')

                            }
                        }
                        else {
                            const validationErrors = ['password is not correct']
                            req.flash('error', validationErrors)
                            req.flash('data', req.body)
                            res.redirect('/change-password')

                        }
                    })

            }})
        })



}


