const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restfullData");

const app = express();

// Routes import
const users = require("./routes/users");

// Middlewares
app.use(logger("dev"));

// Routes
app.use("/users", users);

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
app.listen(port, () => console.log(`Server is listening on port ${port}`));
