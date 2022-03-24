const quiz = require("../models/quiz")

module.exports = async(req,res)=>{
    
    let all_quiz = await quiz.findOne({userid:req.session.userId})
    res.render('test', {quiz:all_quiz})
}