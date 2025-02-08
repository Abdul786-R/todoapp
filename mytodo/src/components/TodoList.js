import React, { useState, useEffect } from 'react';
import { getTodos } from '../api';
import TodoItem from './TodoItem';
import AddTodo from './TodoAdd';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        console.log("Fetched Data:", data);  // Debugging: Check the structure of the data
        
        // Filter todos based on the `completed` field
        setTodos(data.filter((todo) => todo.completed === false)); // Only incomplete todos
        setCompletedTodos(data.filter((todo) => todo.completed === true)); // Only completed todos
      } catch (error) {
        console.error('Error fetching todos', error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
    setCompletedTodos((prevCompletedTodos) =>
      prevCompletedTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    setCompletedTodos((prevCompletedTodos) =>
      prevCompletedTodos.filter((todo) => todo._id !== id)
    );
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <AddTodo onAdd={handleAddTodo} />

      {/* Completed Tasks Section */}
      <h2>Completed Tasks</h2>
      <div className="todos">
        {completedTodos.length > 0 ? (
          completedTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        ) : (
          <p>No completed tasks</p>
        )}
      </div>

      {/* Incomplete Tasks Section */}
      <h2>Incomplete Tasks</h2>
      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        ) : (
          <p>No incomplete tasks</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
