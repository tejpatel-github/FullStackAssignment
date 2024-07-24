const Appointment = require('../models/appointment');
const G2 = require('../models/G2');

const addSlot = async (req, res) => {
    try {
        const { appointmentDate, appointmentTime } = req.body;
        const existingAppointment = await Appointment.findOne({ date: appointmentDate, time: appointmentTime });

        if (existingAppointment) {
            // Slot already exists, redirect with a message or handle as you see fit
            console.log("Time slot already exists for the given date");
            return res.redirect('/appointment');
        }

        const addDates = await Appointment.create({
            date: appointmentDate,
            time: appointmentTime,
        });
        res.redirect('/appointment');
        console.log("update successfully")
    } catch (error) {
        console.log("Error updating data: " + error);
    }
};

const bookAppointment = async (req, res) => {
    const { userId, date, time } = req.body;
    const appointment = await Appointment.findOne({ date, time });

    if (!appointment || !appointment.isTimeSlotAvailable) {
        return res.status(400).json({ message: 'Time slot is not available' });
    }

    appointment.isTimeSlotAvailable = false;
    await appointment.save();

    await G2.findByIdAndUpdate(userId, { $set: { appointmentId: appointment._id } });

    res.status(200).json({ message: 'Appointment booked successfully' });
};

module.exports = {
    addSlot,
    bookAppointment
};