// Declarations
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();
mongoose.set('useCreateIndex', true);


const app = express();
const port = process.env.TESTPORT || 5000;


// Middlewares
app.use(cors());
app.use(express.json());

const connectionString = "mongodb://localhost/exercise-app";

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("Mongodb connection success");
});


const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);



app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});