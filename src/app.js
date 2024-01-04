const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const api = require("./api");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

app.get("/", (req, res) => {
  res.json({
    message: "welcome to my API",
  });
});

app.use("/api/v1", api);

module.exports = app;
