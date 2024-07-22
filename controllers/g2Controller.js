const G2 = require('../models/G2');

const createG2User = async (req, res) => {
    try {
        const g2user = await G2.create({
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
    } catch (error) {
        console.log("Error creating data: " + error);
    }
};

const getG2User = async (req, res) => {
    const licenseNumber = req.query.license;
    try {
        const Gfind = await G2.findOne({ licenseNumber: licenseNumber });
        if (!Gfind) {
            res.render('g2test');
        } else {
            res.render('gpagedisplay', { user: Gfind });
        }
    } catch (error) {
        console.log("Error finding data: " + error);
    }
};

const updateG2User = async (req, res) => {
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
        res.send('Update successfully');
    } catch (error) {
        console.log("Error updating data: " + error);
    }
};

module.exports = {
    createG2User,
    getG2User,
    updateG2User
};
