import axios from 'axios';

const API_URL = 'http://localhost:8080/auth'; // Replace with your actual backend URL

// Login service
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    
    // Store token in localStorage after successful login
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);  // Save token in localStorage
    }

    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

// Signup service
export const signup = async (username: string, password: string, roles: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      roles,
    });
    return response.data;
  } catch (error) {
    console.error('Signup failed', error);
    throw error;
  }
};


// // Fetch Google User Info
// export const fetchGoogleUserInfo = async (accessToken: string) => {
//   try {
//     const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     console.log('Google User:', res.data);

//     // Store token in localStorage (optional)
//     localStorage.setItem('authToken', accessToken);

//     return res.data;
//   } catch (error) {
//     console.error('Fetching Google user info failed', error);
//     throw error;
//   }
// };

