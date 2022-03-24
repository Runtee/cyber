const User = require('../models/user.js')
const path = require('path')

module.exports = (req, res) => {
    // let image = req.files.image;
    // console.log(image);
    if (req.files){

        let image = req.files.picture;
        image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
            // var updateUserInfo = await User.findOne({})
            var Uprofile = {
                picture: '/img/' + image.name,
                fullName: req.body.given_name,
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
                    return res.redirect('/profile')
                }
                req.flash('success', 'Successfully updated your profile')
                res.redirect('/profile')
    
            })
        })
    
    

    }
    else{
        let Uprofile= {
            fullName: req.body.given_name,
            phone: req.body.phone,
            address: req.body.address,
            sex:req.body.sex
        }
        let id = req.session.userId
        User.findOneAndUpdate({id:id},Uprofile, (error, user) => {
            if (error) {
                const validationErrors = Object.keys(error.errors).map(key =>
                    error.errors[key].message)
                req.flash('validationErrors', validationErrors)
                req.flash('data', req.body)
                res.redirect('/profile')
            }
            else{
                req.flash('success', 'Successfully updated your profile')
            res.redirect('/profile')
        }

        })



    }

}


