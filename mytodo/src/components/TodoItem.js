// src/components/TodoItem.js
import React, { useState } from 'react';
import { updateTodo, deleteTodo } from '../api';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todo.task);

  const handleUpdate = async () => {
    try {
      const updatedData = { task: updatedTask, completed: todo.completed };
      const updatedTodo = await updateTodo(todo._id, updatedData);
      onUpdate(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id);
      onDelete(todo._id);
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  const handleComplete = async () => {
    try {
      const updatedData = { task: todo.task, completed: !todo.completed }; // Toggle completed status
      const updatedTodo = await updateTodo(todo._id, updatedData);
      onUpdate(updatedTodo);
    } catch (error) {
      console.error('Error completing todo', error);
    }
  };

  const formattedCreatedAt = new Date(todo.createdAt).toLocaleString();

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          value={updatedTask}
          onChange={(e) => setUpdatedTask(e.target.value)}
        />
      ) : (
        <div className="todo-content">
        <span>{todo.task}</span>
        <p className="created-at">
          <strong>Created At:</strong> {formattedCreatedAt}
        </p>
        </div>
      )}
      <div className="button-group">
        {isEditing ? (
          <button onClick={handleUpdate}>Save</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete-btn"  onClick={handleDelete}>Delete</button>
            <button onClick={handleComplete}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
