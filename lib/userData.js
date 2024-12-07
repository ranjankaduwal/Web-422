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
import { getToken } from './authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithToken(url, options = {}) {
  const token = getToken();
  if (!token) throw new Error('User not authenticated');

  const headers = {
    ...options.headers,
    Authorization: `JWT ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    console.error(`Error: ${response.statusText}`);
    return [];
  }

  return await response.json();
}

// Add to favourites
export async function addToFavourites(id) {
  try {
    const url = `${API_URL}/favourites/${id}`;
    const result = await fetchWithToken(url, { method: 'PUT' });
    return result;
  } catch (error) {
    console.error('Failed to add to favourites:', error);
    return [];
  }
}

// Remove from favourites
export async function removeFromFavourites(id) {
  try {
    const url = `${API_URL}/favourites/${id}`;
    const result = await fetchWithToken(url, { method: 'DELETE' });
    return result;
  } catch (error) {
    console.error('Failed to remove from favourites:', error);
    return [];
  }
}

// Get favourites
export async function getFavourites() {
  try {
    const url = `${API_URL}/favourites`;
    const result = await fetchWithToken(url, { method: 'GET' });
    return result;
  } catch (error) {
    console.error('Failed to fetch favourites:', error);
    return [];
  }
}

// Add to history
export async function addToHistory(id) {
  try {
    const url = `${API_URL}/history/${id}`;
    const result = await fetchWithToken(url, { method: 'PUT' });
    return result;
  } catch (error) {
    console.error('Failed to add to history:', error);
    return [];
  }
}

// Remove from history
export async function removeFromHistory(id) {
  try {
    const url = `${API_URL}/history/${id}`;
    const result = await fetchWithToken(url, { method: 'DELETE' });
    return result;
  } catch (error) {
    console.error('Failed to remove from history:', error);
    return [];
  }
}

// Get history
export async function getHistory() {
  try {
    const url = `${API_URL}/history`;
    const result = await fetchWithToken(url, { method: 'GET' });
    return result;
  } catch (error) {
    console.error('Failed to fetch history:', error);
    return [];
  }
}