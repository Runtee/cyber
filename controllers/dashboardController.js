module.exports = (req, res) => {
    res.render('dashboard', {
        errors: req.flash('success')
    })

}
