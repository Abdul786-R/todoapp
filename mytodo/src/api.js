// src/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const getTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/todos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos', error);
    throw error;
  }
};

export const createTodo = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/api/todos`, { task });
    return response.data;
  } catch (error) {
    console.error('Error creating todo', error);
    throw error;
  }
};

export const updateTodo = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/api/todos/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating todo', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo', error);
    throw error;
  }
};
