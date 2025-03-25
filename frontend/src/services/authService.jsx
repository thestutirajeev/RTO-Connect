import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; 

// Signup Function
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login Function
export const login = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Server error" };
    }
};
