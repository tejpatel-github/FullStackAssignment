const express = require('express')
const path = require('path')
const expressSession = require('express-session');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const G2 = require('./models/G2');
const g2Controller = require('./controllers/g2Controller');
const { ensureAuthenticated, ensureAdmin, ensureDriver } = require('./middleware/authmiddleware');
const logoutController = require('./controllers/logout');
const appointmentController = require('./controllers/appointmentController');


const HomeController = require('./controllers/homeController');
const GetLogin = require('./controllers/getLogin');
const GetAppointment = require('./controllers/getAppointment');
const PostSignup = require('./controllers/postSignup');
const GetLoginUser = require('./controllers/getloginUser');
const Appointment = require('./models/appointment');
const getAppointment = require('./controllers/getAppointment');


mongoose.connect('mongodb+srv://pateltej003:VZmarmF1ViB5XBU8@cluster0.koj4hqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
const app = new express()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(expressSession({
    secret: 'user session'
}))

global.loggedIn = null;
global.userType = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    userType = req.session.userType;
    next();
})


const ejs = require('ejs');
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', HomeController);
app.get('/gtest', ensureAuthenticated, g2Controller.getG2User);
app.get('/g2test', ensureAuthenticated, g2Controller.getG2);
app.get('/login', GetLogin);
app.get('/appointment', ensureAuthenticated, ensureAdmin, GetAppointment)
app.get('/logout', ensureAuthenticated, logoutController);
app.post('/signup', PostSignup);
app.get('/loginpage', GetLoginUser);


// saving userdata from G2 page
app.post('/g2', ensureAuthenticated, g2Controller.createG2User);
app.post('/g/update', ensureAuthenticated, g2Controller.updateGUser);
app.post('/appointmentDates', ensureAuthenticated, ensureAdmin, appointmentController.addSlot);

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

