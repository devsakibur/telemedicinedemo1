const express = require('express');
const PatientRecord = require('../models/patientrecord'); // Ensure the model file path is correct
const router = express.Router();

/**
 * Route to add a new patient record
 */
router.post('/patient-record', async (req, res) => {
    const {
        patientId,
        name,
        problemCategory,
        problemDescription,
        problemDate,
        sufferingDays,
        problemNote,
        uploadedFiles
    } = req.body;

    try {
        // Validate required fields
        if (!patientId || !name || !problemCategory || !problemDescription || !problemDate || !sufferingDays) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new patient record
        const newRecord = new PatientRecord({
            patientId,
            name,
            problemCategory,
            problemDescription,
            problemDate: new Date(problemDate),
            sufferingDays: parseInt(sufferingDays, 10),
            problemNote,
            uploadedFiles: uploadedFiles || []
        });

        // Save to the database
        await newRecord.save();

        res.status(201).json({ message: 'Patient record added successfully', record: newRecord });
    } catch (error) {
        console.error('Error saving patient record:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

/**
 * Route to get all patient records
 */
router.get('/patient-record', async (req, res) => {
    try {
        const records = await PatientRecord.find();
        res.status(200).json(records);
    } catch (error) {
        console.log('Error fetching patient records:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

/**
 * Route to get a single patient record by ID
 */
router.get('/patient-record/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const record = await PatientRecord.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Patient record not found' });
        }
        res.status(200).json(record);
    } catch (error) {
        console.error('Error fetching patient record:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
