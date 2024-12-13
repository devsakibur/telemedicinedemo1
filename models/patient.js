const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Custom ID, if you plan to set it manually
    name: { type: String, required: true }, // Name should be required
    email: { type: String, required: true, unique: true }, // Email required and unique
    mobile: { type: String, required: true }, // Mobile number required
    age: { type: Number, required: true, min: 0 }, // Age required, cannot be negative
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] }, // Gender required with specific values
    village: { type: String, required: true }, // Village required
    upozilla: { type: String, required: true }, // Upozilla required
    district: { type: String, required: true } // District required
});

module.exports = mongoose.model("Patient", PatientSchema);
