const mongoose = require('mongoose');

const PatientRecordSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    name: { type: String, required: false },
    problemCategory: { type: String, required: false },
    problemDescription: { type: String, required: false },
    problemDate: { type: Date, required: false },
    sufferingDays: { type: Number, required: false },
    problemNote: { type: String },
    uploadedFiles: [{ type: String }]
});

module.exports = mongoose.model('PatientRecord', PatientRecordSchema);
