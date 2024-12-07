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
import jwtDecode from 'jwt-decode';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Store the token in localStorage
export function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

// Retrieve the token from localStorage
export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

// Remove the token from localStorage
export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

// Decode the token
export function readToken() {
  const token = getToken();
  if (token) {
    return jwtDecode(token);
  }
  return null;
}

// Check if the user is authenticated
export function isAuthenticated() {
  return !!getToken();
}

// Register a new user
export async function registerUser(userName, password, password2) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password, password2 }),
  });

  if (response.ok) {
    return true;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
}

// Login a user
export async function authenticateUser(userName, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password }),
  });

  if (response.ok) {
    const data = await response.json();
    setToken(data.token);
    return true;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
}
