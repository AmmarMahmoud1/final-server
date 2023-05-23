require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multer = require('multer');
const path = require('path');
const app = express()
const cors = require('cors');
const messageRoute = require("./Routes/messagesRoute");
const socket = require("socket.io");



app.use(bodyParser.json());

const PORT = 5000 || process.env.PORT;

const db = require('./db');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3000',
    /https:\/\/wd37-rubber-ducks\.netlify\.app/,
  ],
  optionsSuccessStatus: 200,
}))
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use('/api/user', require('./Routes/userRoutes'))
app.use('/api' , require('./Routes/postRoutes'))
app.use("/api/message", messageRoute);




 const server = app.listen(PORT, () => {
    console.log(` app listening on port ${PORT}`)
  });


 