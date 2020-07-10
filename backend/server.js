const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//creates express server
const app = express();
const port = process.env.PORT || 5000;

//cors middleware
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const questionsRouter = require('./routes/questions');
const usersRouter = require('./routes/users');
const userSessionsRouter = require('./routes/userSessions');
const hallOfFameEntriesRouter = require('./routes/hallOfFameEntries');

app.use('/questions', questionsRouter);
app.use('/users', usersRouter);
app.use('/sessions', userSessionsRouter);
app.use('/hallOfFameEntries', hallOfFameEntriesRouter);
//starts server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
