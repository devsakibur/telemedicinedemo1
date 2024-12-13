const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor'); // Adjust the path based on your project structure

// CREATE: Add a new doctor
router.post('/doctors', async (req, res) => {
  try {
    const doctorData = req.body;
    if (!doctorData._id) {
      return res.status(400).json({ message: 'Doctor ID (_id) is required' });
    }
    if (!doctorData.password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    const doctor = new Doctor(doctorData);
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ: Get all doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ: Get a specific doctor by ID
router.get('/doctors/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE: Update a doctor by ID
router.put('/doctors/:id', async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a doctor by ID
router.delete('/doctors/:id', async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
