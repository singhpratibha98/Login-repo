const mongoose = require("mongoose");

const EmployeSchema = new mongoose.Schema({
  Name: String,
  email: String,
  password: String,
  
});

const EmplModel = mongoose.model("EmployeeModel", EmployeSchema);

module.exports = EmplModel;


