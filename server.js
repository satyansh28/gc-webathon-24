const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Could not connect to MongoDB server! Shutting down...");
    process.exit(1);
  });

const authRoutes = require("./routes/authRoutes");
const { checkLogin } = require("./middleware/authMiddleware");
const app = express();

app.use(cookieParser());

app.use(express.json({ limit: "1000kb" }));
const cors = (req, res, next) => {
  //res.header("Access-Control-Allow-Origin", process.env.FRONTEND);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Expose-Headers", "set-cookie");
  next();
};

app.use(cors);

app.options("*", (req, res) => {
  res.status(200).send();
});

//routes
app.use("/api/auth", authRoutes);

//global-catch
app.use(async (err, req, res, next) => {
  console.log(err);
  res.status(400).send("Invalid Request.");
});

process.on("uncaughtException", function (error) {
  console.log(error);
});

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
});
