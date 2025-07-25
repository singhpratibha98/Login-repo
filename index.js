const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const authRoute = require("./Routes/authRoutes");
const EmployeeModel = require("./models/EmployeeModel");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// DB connection
mongoose.connect(process.env.MONGO_URL);
console.log("connected to mongoDB");

// Routes
app.use("/api/auth", authRoute);

// home route
app.get("/",(req,res)=>{
  res.send("Api Is Running");
});

app.listen(PORT, () => {
  console.log(`server is running on ${5000}`);
});
