const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const env = require('dotenv').config();

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
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  next();
});

app.use(express.static('public'));

app.use('/auth', authRoutes);

app.get('/', function (req, res) {
  res.sendFile('index.html');
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
  let sql = `select * from todos where id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
});

app.post('/api/todos', (req, res) => {
  let sql = `INSERT INTO todos (text, isDone) VALUES ('${req.body.text}', ${req.body.isDone})`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send('task added');
  });
});

app.delete('/api/todos/:id', (req, res) => {
  let sql = `delete from todos where id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
});

app.put('/api/todos/:id', (req, res) => {
  let sql = `update todos set isDone = ${req.body.isDone} where id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
