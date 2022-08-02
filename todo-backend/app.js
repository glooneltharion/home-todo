const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  next();
});

const todos = [
  {
    id: 1,
    text: 'Learn how to use Vue.js',
    isDone: true,
  },
  {
    id: 2,
    text: 'Drink coffee',
    isDone: false,
  },
  {
    id: 3,
    text: 'vuejsexamples.com',
    isDone: false,
  },
];

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'hello world',
  });
});

app.get('/api/todos', (req, res) => {
  res.status(200).send(todos);
});

app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).send('Task not found!');
  }
  res.status(200).res.send(todo);
});

app.post('/api/todos', (req, res) => {
  const todo = {
    id: todos.length + 1,
    text: req.body.text,
    isDone: req.body.isDone,
  };
  todos.push(todo);
  res.send(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).send('Task not found!');
  }
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  res.send(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).send('Task not found!');
  }
  todo.isDone = req.body.isDone;
  res.send(todo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
