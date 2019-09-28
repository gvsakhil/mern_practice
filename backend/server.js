const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 4500;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/react';

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connected');
});

const userRouter = require('./routes/user');
const exerciseRouter = require('./routes/exercise');

app.use('/exercise', exerciseRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log('Server is running');
})