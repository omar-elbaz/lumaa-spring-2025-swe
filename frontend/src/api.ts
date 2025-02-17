import axios from "axios";

const API_URL = "http://localhost:5000";

export const registerUser = async (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const loginUser = async (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const fetchTask = async (token: string) => {
  return axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (
  token: string,
  title: string,
  description: string
) => {
  return axios.post(
    `${API_URL}/tasks`,
    { title, description },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
export const updateTask = async (
  token: string,
  id: number,
  isComplete: boolean
) => {
  return axios.put(
    `${API_URL}/tasks/${id}`,
    { isComplete },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deleteTask = async (token: string, id: number) => {
  return axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
