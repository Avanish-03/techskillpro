import axios from 'axios';

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`http://localhost:5269/api/Auth/login`, userData);
    return response.data; // Assuming the API returns the token or user data
  } catch (error) {
    throw error.response ? error.response.data : 'Something went wrong';
  }
};

// Register user

export const registerUser = async (formData) => {
  try {
    const payload = {
      fullName: formData.name,
      email: formData.email,
      passwordHash: formData.password,
      roleID: formData.role === 'student' ? 2 : 3, // 2 = student, 3 = teacher
      profileImage: '', // optional field, send empty or base64 if needed
    };

    const response = await axios.post(`http://localhost:5269/api/Auth/signup`, payload);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }

};
