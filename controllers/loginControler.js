module.exports = (req,res)=>{
    res.render('signin', {
        errors:req.flash('validationErrors')
    })
} 