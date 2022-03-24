module.exports = (req,res)=>{
    res.render('change-password',{
        errors:req.flash('error'),
        success: req.flash('success')
    })
  }