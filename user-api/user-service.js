/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Ranjan Kaduwal Student ID: 126578228 Date: 
*
*  Vercel App (Deployed) Link: 
*
********************************************************************************/  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Register a new user
async function registerUser(userName, password) {
  console.log('Registering user:', userName);

  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    throw new Error('Username is already taken');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Original Password:', password);
  console.log('Hashed Password:', hashedPassword);

  const newUser = new User({ userName, password: hashedPassword });
  await newUser.save();

  console.log('User successfully saved:', newUser);
  return { id: newUser._id, userName: newUser.userName };
}

// Login a user
async function loginUser(userName, password) {
  console.log('LoginUser called with:', userName, password);

  const user = await User.findOne({ userName });
  if (!user) {
    throw new Error('Invalid username or password');
  }

  console.log('Input Password:', password);
  console.log('Stored Hashed Password:', user.password);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('Password Valid:', isPasswordValid);

  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  const payload = { id: user._id, userName: user.userName };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
}


module.exports = { registerUser, loginUser };
