const express = require('express')
const mongoose = require('mongoose');
const G2 = require('../models/G2');
const bcrypt = require('bcrypt')


module.exports = async (req, res) => {
    try {
        const password = req.query.password;
        const login = await G2.findOne({ username: req.query.username });
        if (login) {
            bcrypt.compare(password, login.password, (error, same) => {
                if (error) {
                    throw error; // Throw an error to the catch block
                }
                if (same) {
                    req.session.userId = login._id;
                    req.session.userType = login.usertype;

                    if (login.usertype) {
                        res.redirect('/');
                    } else {
                        res.status(400).send('Only drivers can log in to this portal');
                    }
                    // res.render('index');
                    // , { user: login }
                }
                else {
                    res.redirect('/login');
                }
            })
        }

    } catch (error) {
        console.log("Error creating data: " + error);
    }
}