const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  _id: String, // Allow string IDs instead of ObjectId
  name: String,
  email: String,
  password: String

});


module.exports = mongoose.model('User', userSchema);
