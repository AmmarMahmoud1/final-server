require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());

const port = process.env.PORT || 7300;

const db = require("./db");

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use("/api/user", require("./Routes/userRoutes"));
app.use("/api", require("./Routes/postRoutes"));

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
