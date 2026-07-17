require("dotenv").config()
const express = require('express');
const loggerTodo = require('./middlewares/logger.js');
const validatePost = require('./middlewares/validatePost.js');
const validatePatch = require('./middlewares/validatePatch.js')
const errorHandler = require('./middlewares/errorHandler.js');
const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(loggerTodo);
let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
  { id: 3, task: 'Take some classes', completed: false},
  { id: 4, task: 'Watch some videos', completed:false},
];

// GET All – Read
app.get('/todos', (req, res, next) => {
  res.status(200).json(todos); // Send array as JSON
});

// Get specific id
app.get('/todospec/:id', (req, res, next) => {
  let todo;
  try {
    todo = todos.find((t) => t.id === parseInt(req.params.id));  
    if (!todo) throw new Error ("No todo with the id!");
  } catch (error) {return next(error)}
    res.status(202).json(todo);
});

//Get only the id that are completed
app.get('/todos/active', (req, res, next) => {
  let todo;
  try {
    todo = todos.filter((t) => t.completed === true);
    if (!todo.length) throw new Error ("All todos have been completed!");
  } catch (error) {return next (error)}
  res.status(200).json(todo);
});

// POST New – Create
app.post('/todos', validatePost, (req, res, next) => {
  const newTodo = { id: todos.length + 1, ...req.body }; // Auto-ID
  //if(!req.body.task) res.status(400).json({"message": "A task is required"});
  todos.push(newTodo);
  res.status(201).json(newTodo); // Echo back
});


// PATCH Update – Partial
app.patch('/todos/:id', validatePatch, (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  Object.assign(todo, req.body); // Merge: e.g., {completed: true}
  res.status(200).json(todo);
});

// DELETE Remove
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); // Array.filter() – non-destructive
  if (todos.length === initialLength)
    return res.status(404).json({ error: 'Not found' });
  res.status(200).send(todos); // Silent success
});

app.get('/todos/completed', (req, res) => {
  const completed = todos.filter((t) => t.completed);
  res.json(completed); // Custom Read!
});

app.use(errorHandler);
  
PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
