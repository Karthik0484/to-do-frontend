import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios.get("https://to-do-backend-lorq.onrender.com")
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    axios.post("https://to-do-backend-lorq.onrender.com", { text: newTodo })
      .then(res => setTodos([...todos, res.data]));
    setNewTodo("");
  };

  const toggleComplete = (id, completed) => {
    axios.put(`https://to-do-backend-lorq.onrender.com${id}`, { completed: !completed })
      .then(res => setTodos(todos.map(todo => (todo._id === id ? res.data : todo))));
  };

  const deleteTodo = (id) => {
    axios.delete(`https://to-do-backend-lorq.onrender.com${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)));
  };

  return (
    <div className="app">
      <h1>✅ To-Do List</h1>
      
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>➕ Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className={todo.completed ? "completed" : ""}>
            <span>{todo.text}</span>
            <div>
              <button className="toggle" onClick={() => toggleComplete(todo._id, todo.completed)}>
                {todo.completed ? "Undo" : "✔ Done"}
              </button>
              <button className="delete" onClick={() => deleteTodo(todo._id)}>🗑 Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
