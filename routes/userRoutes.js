const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Patient = require("../models/patient");

// Register User and as patient Route
router.post("/register", async (req, res) => {
    try {
        const { id, name, email, password, mobile, age, gender, village, upozilla, district } = req.body;

        // Validate Input
        if (!id || !name || !email || !password || !mobile || !age || !gender || !village || !upozilla || !district) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Check if custom ID already exists
        const existingId = await User.findOne({ _id: id });
        if (existingId) {
            return res.status(400).json({ message: "Custom ID already exists" });
        }

        // Save to Users Collection
        const newUser = new User({ _id: id, name, email, password });
        await newUser.save();

        // Save to Patients Collection
        const newPatient = new Patient({
            _id: id, // Use the same custom ID
            name, email, mobile, age, gender, village, upozilla, district
        });
        await newPatient.save();

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

//all route for patient


// READ: Get all patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ: Get a specific patient by ID
router.get('/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE: Update a patient by ID
router.put('/patients/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a patient by ID
router.delete('/patients/:id', async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
