const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

require("dotenv").config()
const express = require('express');
const loggerTodo = require('./middlewares/logger.js');
const connectDb = require('./database/db.js');
const validatePost = require('./middlewares/validatePost.js');
const validatePatch = require('./middlewares/validatePatch.js')
const errorHandler = require('./middlewares/errorHandler.js');
const todomodel = require('./models/todo.model.js');
const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(loggerTodo);
connectDb();

//Get only the id that are completed
app.get('/todos', async (req, res, next) => {
  try {
    console.log(req.query)
    const todo = await todomodel.find(req.query);
    if (todo.length === 0) return res.status(404).send('No todo with such query');
    res.status(200).json(todo);
  } catch (error) {
    return next(error);
  }
});
// GET All – Read
app.get('/todos', async (req, res, next) => {
  try {
  const todos = await todomodel.find({});
  res.status(200).json(todos); // Send array as JSON
  } catch (error) {
    next(error);
  }
});


// POST New – Create
app.post('/todos', validatePost, async (req, res, next) => {
  try {
    const newTodo = new todomodel(req.body);
    await newTodo.save();
    res.status(201).json(newTodo); 
  } catch (error){
    next(error);
  }
});


// PATCH Update – Partial
app.patch('/todos/:id', validatePatch, async (req, res, next) => {
  try {
    const todo = await todomodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      validatePatch: true,
    });
    if (!todo) return res.status(404).json({error: 'Not found'});
    res.json(todo)
  } catch (error) {
    next (error);
  }
});

// DELETE Remove
app.delete('/todos/:id', async (req, res, next) => {
  try {
    const todo = await todomodel.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({error: 'Not found'});
  } catch (error) {
    next(error);
  }
  res.status(200).send(todomodel(todos));
});

app.use(errorHandler);
  
PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
