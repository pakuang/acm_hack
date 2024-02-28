const express = require("express");
const logger = require("morgan");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const server = express();

const scheduleRoutes = require("./routes/schedules");
const userRoutes = require("./routes/users");

server.use(cors());
server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//routes
server.use("/api/schedules", scheduleRoutes);
server.use("/api/users", userRoutes);

dotenv.config();
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB database");
});

server.listen(process.env.PORT, () => {
    console.log("Server started on PORT " + process.env.PORT);
});

module.exports = server;