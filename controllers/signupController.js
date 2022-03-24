module.exports = (req,res)=>{
    res.render('signup',{
    errors:req.flash('error'),
    success:req.flash('success')}
    )
}