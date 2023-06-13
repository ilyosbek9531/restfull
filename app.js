require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/restfullData", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit(1);
  }
};

const app = express();

// Routes import
const users = require("./routes/users");
const cars = require("./routes/cars");

// Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());

// Routes
app.use("/users", users);
app.use("/cars", cars);

// catch 404 errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // Response to client
  res.status(status).json({ error: { message: error.message } });

  // Response to ourselves
  console.error(err);
});

// start the server
const port = app.get("port") || 4000;
connectDB().then(() => {
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
});
