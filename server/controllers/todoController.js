const Todo = require('../models/todoModels');

// GET all to-dos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new to-do
const createTodo = async (req, res) => {
  const { task } = req.body;

  try {
    const newTodo = new Todo({ task });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT to update a to-do (toggle completion)
const updateTodo = async (req, res) => {
    try {
      const { task, completed } = req.body; // Destructure task and completed from request body
      
      // Find the to-do by ID
      const todo = await Todo.findById(req.params.id);
      if (!todo) return res.status(404).json({ message: 'To-do not found' });
  
      // If task is provided in the request body, update it
      if (task) todo.task = task;
      
      // If completed is provided in the request body, update it
      if (completed !== undefined) todo.completed = completed;
  
      const updatedTodo = await todo.save();
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// DELETE a to-do
const deleteTodo = async (req, res) => {
    try {
      // Use findByIdAndDelete to delete the todo directly
      const todo = await Todo.findByIdAndDelete(req.params.id);
      
      if (!todo) return res.status(404).json({ message: 'To-do not found' });
  
      res.status(200).json({ message: 'To-do deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
