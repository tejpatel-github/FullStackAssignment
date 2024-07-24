const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const G2 = require('../models/G2');


module.exports = async (req, res) => {
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
}