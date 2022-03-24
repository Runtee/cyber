const mongoose = require('mongoose')
const Schema = mongoose.Schema;


let quizSchema = mongoose.Schema({
    Why: Number,
    Phishing: Number,
    Malware: Number,
    Spoofing: Number,
    Dos: Number,
    Hacking: Number,
    Social: Number,
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        }
})

var quiz = mongoose.model("quiz", quizSchema, "quiz");
module.exports = quiz;

