let createError = require("http-errors");
let express = require("express");

const connectDB = require("./config/db");

let path = require("path");
let logger = require("morgan");
let compression = require("compression");
let cors = require("cors");
let helmet = require("helmet");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let authRouter = require("./routes/auth");
let productRouter = require("./routes/products");

let app = express();

//* connect db
connectDB();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* define route
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  console.error(err.message);
  res.send({ status: "fail", message: "Internal Server Error" });
});

module.exports = app;
