const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/EmployeeModel");
require('dotenv').config();

const PORT= process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);
console.log("connected to mongoDB");


// ----------LogOut------------ //

app.post("/logout", (req, res) => {
  res.json("Logged out successfully");
});

//--------------Login---------------- //
app.post("/login", (req, res) => {
  const { email, password } = req.body; // get the record of email and passowrd by writting this

  EmployeeModel.findOne({ email: email })
  .then((user) => {
    // here will check if user is exist then give result
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("password is incorrect");
      }
    } else {
      res.json("No Record Existed");
    }
  });
});

//------------Register---------------//

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => re.json(err));
});

app.listen(PORT, () => {
  console.log(`server is running on ${5000}`);
});