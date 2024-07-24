const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AppointmentDates = new mongoose.Schema({
  date: String,
  time: String,
  isTimeSlotAvailable: {type: Boolean, default: true}
});


const Appointment = mongoose.model('Appointments', AppointmentDates);
module.exports = Appointment;