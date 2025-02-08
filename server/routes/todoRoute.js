const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

// Define Routes
router.get('/', getTodos);       // GET all to-dos
router.post('/', createTodo);    // POST new to-do
router.put('/:id', updateTodo);  // PUT update to-do
router.delete('/:id', deleteTodo); // DELETE to-do

module.exports = router;
