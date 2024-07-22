const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const G2 = require('./models/G2');
const g2Controller = require('./controllers/g2Controller');
mongoose.connect('mongodb+srv://pateltej003:VZmarmF1ViB5XBU8@cluster0.koj4hqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
const app = new express()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));





const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.get('/gtest', (req, res) => {
    res.render('gtest.ejs');
});
app.get('/g2test', (req, res) => {
    res.render('g2test.ejs');
});
app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/signup', async (req, res) => {
    try {
        if (req.body.password === req.body.re_password) {

            const signupUser = await G2.create({
                username: req.body.username,
                password: req.body.password,
                usertype: req.body.usertype,
            });
            res.render('login');
            console.log("Data has been successfully stored.");
        }
        else {
            res.redirect('/login');
            console.log("Password not matched");
        }
    } catch (error) {
        console.log("Error creating data: " + error);
    }
});

app.get('/loginpage', async (req, res) => {
    try {
        const login = await G2.findOne({ username: req.query.username });
        if (login) {
            bcrypt.compare(req.query.password, login.password, (error, same) => {
                if (error) {
                    throw error; // Throw an error to the catch block
                }
                if (same) {
                    res.render('index', {user: login});
                }
                else {
                    res.redirect('/login');
                }
            })
        }
    } catch (error) {
        console.log("Error creating data: " + error);
    }
})

// saving userdata from G2 page
app.post('/g2', g2Controller.createG2User);


app.get('/g', g2Controller.getG2User);

app.post('/g/update', g2Controller.updateG2User);

app.listen(4000, () => {
    console.log('App listening on port 4000')
})