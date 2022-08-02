const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nirvana813',
  database: 'todo',
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//Create DB

app.get('/createDB', (req, res) => {
  let sql = 'CREATE DATABASE todo';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('database created');
  });
});

//Create Table

app.get('/createtable', (req, res) => {
  let tableName = 'todos';
  let sql = `CREATE TABLE ${tableName} 
        (id INT AUTO_INCREMENT PRIMARY KEY, 
        text VARCHAR(255), isDone BOOLEAN)`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('table created');
  });
});

//Insert Data

app.get('/insertdata', (req, res) => {
  let sql = 'INSERT INTO todos (text, isDone) VALUES ?';
  var values = [
    ['Learn how to use Vue.js', false],
    ['Drink coffee', false],
    ['vuejsexamples.com', false],
  ];
  connection.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log('Number of records inserted: ' + result.affectedRows);
    res.send('data inserted');
  });
});

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
  let sql = 'select * from todos';
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
});

app.get('/api/todos/:id', (req, res) => {
  /*const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).send('Task not found!');
  }
  res.status(200).res.send(todo);*/

  let sql = `select * from todos where id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
});

/*app.post('/api/todos', (req, res) => {
  let todo = [req.body.text, req.body.isDone];

  //todos.push(todo);
  //res.send(todo);

  let sql = `INSERT INTO todos (text, isDone) VALUES ('${req.body.text}', ${req.body.isDone})`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
});*/

app.delete('/api/todos/:id', (req, res) => {
  /*const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).send('Task not found!');
  }
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  res.send(todo);*/

  let sql = `delete from todos where id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
});

app.put('/api/todos/:id', (req, res) => {
  /*const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).send('Task not found!');
  }
  todo.isDone = req.body.isDone;
  res.send(todo);*/

  let sql = `update todos set isDone = ${req.body.isDone} where id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
