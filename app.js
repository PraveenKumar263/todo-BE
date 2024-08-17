// import the express module
const express = require('express');
const todoRouter = require('./routes/todoRoutes');
const requestLogger = require('./utils/logger');
const cors = require('cors');

// create an express application
const app = express();

// use the express middleware for parsing json data
app.use(express.json());

// use the express middlerware for enabling CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}))

// use the express middleware for logging
app.use(requestLogger);

app.use('/api/v1/todos', todoRouter);

module.exports = app;