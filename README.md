# Todo App

This project uses [Angular CLI](https://github.com/angular/angular-cli) version 14 for Frontend.

This project uses [Express.js](https://expressjs.com/) version 4 for Backend.

This project uses [MySQL](https://github.com/sidorares/node-mysql2) version 2 for database.

## Concepts Covered

- Using the Angular CLI
- Working with Angular components and service
- Using the Http object for Ajax calls along with RxJS observables
- Using TypeScript classes and types
- Performing GET, PUT, POST and DELETE requests to the server

## Prerequisites

1. Node.js version 12 or higher installed locally
2. Angular-CLI installed locally
3. MySQL installed locally

## Installation

Clone the repository: git clone [https://github.com/glooneltharion/home-todo.git](https://github.com/glooneltharion/home-todo.git)

### Frontend

Open terminal and run:

```console
cd todo-frontend
npm i
```

### Backend

Open terminal and run:

```console
cd todo-backend
npm i
```

### Configuration

Open terminal and run:

```console
cp sample.env .env
```

### MySQL

Add your data at the backend folder in file .env:

DB_HOST=
DB_USER=
DB_PASS=

At the backend folder in file app.js delete databese for now:

const connection = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASS,
~~database: 'todo',~~
});

Navigate to `http://localhost:3000/` and click on Create DB, then add database:

const connection = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASS,
database: 'todo',
});

Navigate to `http://localhost:3000/` and click on Create Table and Insert Data.

## Prettier and Eslint

### Eslint

Run `ng lint` or `npm lint` at the frontend folder to lint the code.

### Prettier : Frontend-angular and Results

Run `npm run format` at the frontend folder to prettier the code.

## Development server

### Frontend

Run `ng serve` or `npm start` at the project fronted folder and navigate to `http://localhost:4200/`.

### Backend

Run `npm start` and at the project backend folder navigate to `http://localhost:3000/`.
