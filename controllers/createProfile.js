const path = require('path')
const User = require('../models/user.js')

module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
        // var updateUserInfo = await User.findOne({})
        var Uprofile = {
            picture: '/img/' + image.name,
            fullName: req.body.given_name + ' ' +req.body.family_name,
            phone:req.body.phone,
            address:req.body.address,
            sex: req.body.sex
        }
        User.findOneAndUpdate({id:req.session.userId},Uprofile, (error, user) => {
            if (error) {
                const validationErrors = Object.keys(error.errors).map(key =>
                    error.errors[key].message)
                req.flash('validationErrors', validationErrors)
                req.flash('data', req.body)
                return res.redirect('/users')
            }
            req.flash('error','successfully logged in into your account')
            res.redirect('/dashboard')

        })
    })


}
