require('dotenv').config()
const express = require('express')
const app = new express()
const ejs = require('ejs')
const flash = require('connect-flash');
const expressSession = require('express-session');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')

app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())
mongoose.connect('mongodb+srv://runtee:'+process.env.PASSWORD+'@cluster0.wvqt2.mongodb.net/Cyberware',
 { useNewUrlParser: true, useUnifiedTopology: true },(err,db)=>{
  if (db){
    console.log('database connected successfully')
  }
  if (err){
      console.log(err);
  }
});
// mongoose.connect('mongodb://localhost:27017/Cyberware',
//  { useNewUrlParser: true, useUnifiedTopology: true },(err,db)=>{
//   if (db){
  
//     console.log('database connected successfully')
//   }
// });


const homeController = require('./controllers/homeController');
const loginControler = require('./controllers/loginControler');
const signupController = require('./controllers/signupController');
const dashboardController = require('./controllers/dashboardController');
const profileController = require('./controllers/profileController');
const connectEnsureLogin = require('connect-ensure-login');
const loginPostController = require('./controllers/loginPostController');
const registerController = require('./controllers/registerController');
const whyController = require('./controllers/whyController')
const dosController = require('./controllers/dosController')
const hackingController = require('./controllers/hackingController')
const loader = require('./controllers/quizController')
const malwareController = require('./controllers/malwareController')
const phishingController = require('./controllers/phishingController')
const socialengineering = require('./controllers/socialengineering')
const spoofing = require('./controllers/spoofing')
const pFormController = require('./controllers/pFormController')
const createProfile = require('./controllers/createProfile')
const changePassword = require('./controllers/changePassword')
const passqordC = require('./controllers/passqordC')
const authMiddleware = require('./middleware/authMiddleware');
const test = require('./controllers/test');
const profilePostController = require('./controllers/profilePostController');



// mongoose.set('useCreateIndex',true)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.listen(3000, () => {
  console.log('App listening on port 3000')
})
app.use(expressSession({
  secret: 'beauty101',
  saveUninitialized: false,
  resave: true
}));

app.use(flash())



app.get('/', homeController)

app.get('/login', loginControler)
app.get('/signup', signupController)
app.post('/login/post', loginPostController)

global.loggedIn = null;
app.use("*", (req, res, next) => {
loggedIn = req.session.userId;
next()
});

app.get('/dashboard', authMiddleware, dashboardController)
app.get('/profile',authMiddleware,  profileController)
app.get('/whys',authMiddleware,  whyController)
app.get('/dos',authMiddleware, dosController)
app.get('/hacking', authMiddleware, hackingController)
app.get('/malware',authMiddleware,  malwareController)
app.get('/phishing',authMiddleware,phishingController)
app.get('/socialengineering',authMiddleware, socialengineering)
app.get('/spoofing',authMiddleware, spoofing);
app.get('/users',authMiddleware, pFormController)
app.post('/quiz',authMiddleware,loader)
app.post('/register', authMiddleware,registerController)
app.post('/register-profile',authMiddleware,createProfile)
app.post('/change-password',authMiddleware,passqordC)
app.get('/change-password',authMiddleware,changePassword)
app.get('/tests',authMiddleware, test)
app.post('/profile',authMiddleware,profilePostController)

app.get('/loader-dos',authMiddleware, (req,res)=>{
  res.render('loader dos')
})
app.get('/loader-hacking',authMiddleware, (req,res)=>{
  res.render('loader hacking')
})
app.get('/loader-malware',authMiddleware, (req,res)=>{
  res.render('loader malware')
})
app.get('/loader-phishing',authMiddleware, (req,res)=>{
  res.render('loader phishing')
})
app.get('/loader-social',authMiddleware, (req,res)=>{
  res.render('loader social')
})
app.get('/loader-spoofing',authMiddleware, (req,res)=>{
  res.render('loader spoofing')
})
app.get('/loader-why',authMiddleware, (req,res)=>{
  res.render('loader why')
})


app.get('/video-dos',authMiddleware, (req,res)=>{
  res.render('video dos')
})
app.get('/video-hacking',authMiddleware, (req,res)=>{
  res.render('video hacking')
})
app.get('/video-malware',authMiddleware, (req,res)=>{
  res.render('video malware')
})
app.get('/video-phishing',authMiddleware, (req,res)=>{
  res.render('video phishing')
})
app.get('/video-social',authMiddleware, (req,res)=>{
  res.render('video social')
})
app.get('/video-spoofing',authMiddleware, (req,res)=>{
  res.render('video spoofing')
})
app.get('/video-why',authMiddleware, (req,res)=>{
  res.render('video why')
})

app.get('/logout', (req, res) => {
  req.session.destroy(() =>{
    res.redirect('/')
    })
})
