const Quiz = require('../models/quiz')
module.exports = (req, res) => {
    Quiz.findOne({userid:req.session.userId}, async(er, user) => {
        if (user) {
            newQ =  Quiz.findOne({ userid: req.session.userId })
            newp = {
                ...
                req.body, userid: req.session.userId
            }
            await newQ.updateOne(newp,(e,u)=>{
                if(u){
                res.redirect('/tests')}
            })
            
          
            // Quiz.findOneAndUpdate({ userid: req.session.userId }, newp, (error, user) => {
            //     if (error) {
            //         throw error
            //     }
            //     else {
            //         res.redirect('/tests')
            //     }
            // })
        }
        if (er) {
            throw er
        }
        else if(!user) {
            console.log('else');
            Quiz.create({
                ...
                req.body, userid: req.session.userId
            },
                (err, quiz) => {
                    if (err) {
                        throw err
                    }
                    if (quiz) {
                        res.redirect('/tests')
                    }
                })
        }
    })


}