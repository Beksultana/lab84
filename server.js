const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const tasks = require('./app/tasks');
const users = require('./app/users');

const app = express();
app.use(express.json());

const port = 7050;

mongoose.connect(config.userDb, config.mongooseOptions).then(() => {

    app.use('/users', users);
    app.use('/tasks', tasks);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
});