const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const EmployeSchema = new mongoose.Schema({
  name:String,
  email:{ type: String, unique: true },
  password:String,
  role:{
    type: String,
    enum: ["admin","user"],
    default: "user",

  },

});

// hash password before saving

  EmployeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  const salt = await bcrypt.genSalt(10); //create a salt

  this.password = await bcrypt.hash(this.password, salt); // hash password
  next();
});




const EmplModel = mongoose.model("EmployeeModel", EmployeSchema);

module.exports = EmplModel;


