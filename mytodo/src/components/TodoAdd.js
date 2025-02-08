// src/components/AddTodo.js
import React, { useState } from 'react';
import { createTodo } from '../api';

const AddTodo = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleAdd = async () => {
    if (task.trim() === '') return; // Don't add empty tasks
    try {
      const newTodo = await createTodo(task);
      onAdd(newTodo);
      setTask('');
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new to-do"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddTodo;
