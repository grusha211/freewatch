import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';
const PROFILE_URL = 'http://localhost:8000/api/profile';

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  console.log(response);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

const updateProfile = async (profileData, token) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token }
  };
  const response = await axios.put(`${PROFILE_URL}/update`, profileData, config);
  return response.data;
};

const uploadVideo = async (videoData, token) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token }
  };
  const response = await axios.post(`${PROFILE_URL}/uploadVideo`, videoData, config);
  return response.data;
};

const getUserProfile = async (token) => {
    const config = {
        headers: {'x-auth-token': token }
      };
      console.log(config);
    const response = await axios.get(`${PROFILE_URL}/home`, config);
    return response.data;
  };

export { signup, login, updateProfile, uploadVideo, getUserProfile };
