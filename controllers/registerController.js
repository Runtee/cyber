const path = require('path')
const User = require('../models/user.js')
module.exports = async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email

    User.create({username:username,password:password, email:email}, (error, user) => {
        if (error) {
            if (Object.keys(error.errors) == 'username') {
                const validationErrors = 'Username already exists'
                req.flash('error', validationErrors)
                req.flash('data', req.body)
                console.log('error1');
                return res.redirect('/signup');
            }
            else {
                const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                req.flash('error', validationErrors)
                req.flash('data', req.body)
                console.log('error21');
                return res.redirect('/signup');
            }
    
    
    
        }
        else {
            console.log('error13');
            req.flash('success', 'Successfully created an account') 
            req.session.userId = user._id
            res.redirect('/users');
        }
    }
    )
}
