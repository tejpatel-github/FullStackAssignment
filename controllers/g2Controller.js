const session = require('express-session');
const G2 = require('../models/G2');
const bcrypt = require('bcrypt');

const createG2User = async (req, res) => {
    try {
        // const licenseNumber = bcrypt.hash(req.body.licenseNumber, 10);
        const user = req.session.userId
        if (user) {
            const g2user = await G2.findOneAndUpdate({ _id: user }, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                licenseNumber: req.body.licenseNumber,
                carDetails: {
                    make: req.body.make,
                    model: req.body.model,
                    year: req.body.year,
                    platNumber: req.body.platNumber,
                },
            });
            res.redirect('/g2test');
            console.log("Data has been successfully stored.");
        }
    } catch (error) {
        console.log("Error creating data: " + error);
    }
    
};

const getG2User = async (req, res) => {
    if (req.session.userId) {


        try {
            const Gfind = await G2.findOne({ _id: req.session.userId });
            if (!Gfind.firstName) {
                res.render('g2test');
            } else {
                res.render('gpagedisplay', { user: Gfind });
            }
        } catch (error) {
            console.log("Error finding data: " + error);
        }
    }
};

const updateGUser = async (req, res) => {
    try {
        const licenseNumber = req.body.licenseNumber;
        const Gupdate = await G2.findOneAndUpdate(
            { licenseNumber: licenseNumber },
            {
                carDetails: {
                    make: req.body.make,
                    model: req.body.model,
                    year: req.body.year,
                    platNumber: req.body.platNumber
                }
            },
            { new: true }
        );
        res.redirect('/gtest');
        console.log("update successfully")
    } catch (error) {
        console.log("Error updating data: " + error);
    }
};


const getG2 = (req, res) => {
    res.render('g2test.ejs');
}

module.exports = {
    createG2User,
    getG2User,
    updateGUser,
    getG2
};
