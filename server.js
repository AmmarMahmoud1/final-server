require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors');




app.use(bodyParser.json());

const PORT = 3000|| process.env.PORT;

const db = require('./db');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3000',
    'https://searchandoffer.onrender.com'
  ],
  optionsSuccessStatus: 200,
}))
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use('/api/user', require('./Routes/userRoutes'))
app.use('/api' , require('./Routes/postRoutes'))
app.use("/api/messages", require('./Routes/messagesRoute'));




app.listen(PORT, () => {
    console.log(` app listening on port ${PORT}`)
  });


 