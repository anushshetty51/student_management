import axios from 'axios';

const API_URL = 'http://localhost:8080/stats';

// Get the average marks for a specific subject
export const getSubjectAverage = async (subject: string) => {
  try {
    const token = localStorage.getItem('authToken');  // Get token from localStorage
    const response = await axios.get(`${API_URL}/average/${subject}`, {
      headers: {
        "Authorization": `Bearer ${token}`,  // Add token to Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get subject average', error);
    throw error;
  }
};

// Get overall percentage statistics
export const getPercentage = async () => {
  try {
    const token = localStorage.getItem('authToken');  // Get token from localStorage
    const response = await axios.get(`${API_URL}/percentage`, {
      headers: {
        "Authorization": `Bearer ${token}`,  // Add token to Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get percentage', error);
    throw error;
  }
};
