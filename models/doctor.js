const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true
  },
  specialization: {
    type: String,
    required: false,
    trim: true
  },
  qualifications: {
    type: [String], // Array of degrees/certifications
    required: false
  },
  experience: {
    type: Number, // Years of practice
    required: false,
    min: 0
  },
  languagesSpoken: {
    type: [String], // Array of languages
    required: false
  },
  hospitalAffiliations: {
    type: [String], // Array of affiliated institutions
    default: []
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  availability: {
    days: {
      type: [String], // Example: ['Monday', 'Wednesday', 'Friday']
      required: false
    },
    timeSlots: {
      type: [String], // Example: ['9:00 AM - 11:00 AM', '2:00 PM - 5:00 PM']
      required: false
    }
  },
  consultationDetails: {
    fees: {
      type: Number, // Fee per session
      required: false,
      min: 0
    },
    types: {
      type: [String], // Example: ['Video', 'In-Person', 'Chat']
      required: false
    },
    specialServices: {
      type: [String], // Example: ['Follow-up', 'Prescription']
      default: []
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: [
      {
        patientName: { type: String, required: false },
        reviewText: { type: String, required: false },
        rating: { type: Number, required: false, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  profilePhoto: {
    type: String, // URL to the photo
    default: ''
  },
  bio: {
    type: String,
    trim: false
  },
  memberships: {
    type: [String],
    default: []
  },
  contactDetails: {
    email: {
      type: String,
      required: true,
      unique: false
    },
    phoneNumber: {
      type: String,
      required: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
