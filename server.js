const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory “database”
let todos = [
  { id: 1, task: 'Learn Render Web Services', done: false },
  { id: 2, task: 'Deploy this sample API',    done: false }
];

// List all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Create a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: Date.now(), task, done: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Toggle done status
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  res.json(todos.find(t => t.id === id));
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🟢 Server running on http://localhost:${PORT}`);
});
