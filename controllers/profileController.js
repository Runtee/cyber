const User = require("../models/user")
const quiz = require("../models/quiz")

module.exports = async (req, res) => {
        let all_quiz = await quiz.findOne({ userid: req.session.userId })

        const user = await User.findById(req.session.userId)
        res.render('profile', {
                data: req.flash('data'),
                errors: req.flash('validationErrors'),
                user: user,
                quiz: all_quiz,
                success: req.flash('success')
        })

}