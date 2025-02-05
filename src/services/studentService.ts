import axios from 'axios';


const API_URL = 'http://localhost:8080/students';

// Get all students
export const getAllStudents = async () => {
  try {
    const token = localStorage.getItem('authToken');  // Get token from localStorage
    const response = await axios.get(`${API_URL}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // Add token to Authorization header
      }
    });
    console.log("Debug: Response received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching students", error);
    throw error;
  }
};

// Get student by ID
export const getStudentById = async (id: number) => {
  try {
    const token = localStorage.getItem('authToken');  // Get token from localStorage
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,  // Add token to Authorization header
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch student by ID', error);
    throw error;
  }
};

// Create a new student
export const createStudent = async (student: { name: string; scienceMarks: number; englishMarks: number; mathMarks: number }) => {
  try {
    const token = localStorage.getItem('authToken');  // Get token from localStorage
    const response = await axios.post(`${API_URL}/create`, student, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // Add token to Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create student', error);
    throw error;
  }
};

// Delete a student by ID
export const deleteStudent = async (id: number) => {
  try {
    const token = localStorage.getItem('authToken');  // Get token from localStorage
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,  // Add token to Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete student', error);
    throw error;
  }
};

export const updateStudentMarks = async (id: number, marks: { [key: string]: number }) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');

    const response = await axios.put(`${API_URL}/${id}/marks`, marks, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log('Update response:', response.data);  // Debug log
    return response.data;
  } catch (error) {
    console.error('Failed to update student marks', error);
    throw error;
  }
};