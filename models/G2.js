const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const G2UserSchema = new mongoose.Schema({
  firstName: { type: String, default: ''},
  lastName: { type: String, default: ''},
  licenseNumber: { type: String, default: ''},
  age: { type: Number, default: 0},
  username: { type: String, unique: true, default: 'demo'},
  password: { type: String, default: 'demo'},
  usertype: { type: String, default: 'Driver'},
  carDetails: {
    make: { type: String, default: ''},
    model: { type: String, default: ''},
    year: { type: String, default: 0},
    platNumber: { type: String, default: ''},
  },
  appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointments' }
});

G2UserSchema.pre('save', function (next) {
  const user = this
  bcrypt.hash(user.licenseNumber, 10, (error, hash) => {
    user.licenseNumber = hash
    next()
  })
})

G2UserSchema.pre('save', function (next) {
  const user = this
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
  })
})

const G2 = mongoose.model('G2', G2UserSchema);
module.exports = G2;