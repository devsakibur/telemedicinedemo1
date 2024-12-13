const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const multer = require('multer');




const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://admin:Rdrscdec2024@cluster0.n29f4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.bpo5u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err));


  
// Create a new user
app.post('/users', async (req, res) => {
  const { userId, email, mobile, name } = req.body;
  try {
    const newUser = new User({ userId, email, mobile, name });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Read all users (or a specific user by userId)
// app.get('/users/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const user = await User.findOne({ userId });
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  console.log("Received ID:", id); // Debugging log for the received ID

  try {
      // Find the user by the _id field
      const user = await User.findById(id); 

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
  } catch (err) {
      console.error('Error fetching user:', err);

      // Handle invalid ObjectId error
      if (err.name === 'CastError') {
          return res.status(400).json({ message: 'Invalid ID format' });
      }

      res.status(500).json({ error: err.message });
  }
});


//all users
app.get('/users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all documents
      res.status(200).json(users); // Respond with the user data
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });






// Update a user by userId
app.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { email, mobile, name } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { email, mobile, name },
      { new: true } // Return the updated document
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user by userId
app.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findOneAndDelete({ userId });
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

const patientRecordRoutes = require("./routes/patientRecordRoutes")
app.use(patientRecordRoutes)





// Start the server
app.listen(3000,'0.0.0.0', () => {
  console.log('SSServer is running on port 3000 ');
});
