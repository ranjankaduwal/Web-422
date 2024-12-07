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
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../user-service');
const passport = require('passport');

// Register route
router.post('/register', async (req, res) => {
  console.log('Register route hit');
  console.log('Request body:', req.body);
  try {
    const { userName, password, password2 } = req.body;

    if (!userName || !password || !password2) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== password2) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = await registerUser(userName, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log('Login route hit');
  console.log('Request body:', req.body);
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const token = await loginUser(userName, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
