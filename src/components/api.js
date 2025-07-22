// src/services/api.js

// Store the Apps Script URL in an environment variable for security
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

// Add a secret key for additional security
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Submit form data to Google Sheets
 * @param {Object} formData - The form data to submit
 * @returns {Promise} - Response from the API
 */
export const submitFormData = async (formData) => {
  try {
    // You can add additional security by adding a timestamp
    const timestamp = new Date().getTime();
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY,
        'X-Timestamp': timestamp.toString(),
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to submit form');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};