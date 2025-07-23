const bcrypt = require("bcryptjs");
const EmployeeModel = require("../models/EmployeeModel");
const jwt = require("jsonwebtoken");

// REGISTER

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new EmployeeModel({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await user.save();

    res.status(201).json({ message: "user regstered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login API hit");
  console.log("Email:", email);
  console.log("Password:", password);

  try {
    const user = await EmployeeModel.findOne({ email }); // find user from DB
    if (!user) {
      console.log("user not found"); 

      return res.status(404).json({ message: "user not found" });
    }

    console.log("hashed password from db:", user.password);

    const isMatch = await bcrypt.compare(password, user.password); 
    console.log("Password Match:", isMatch); 

    // if (!isMatch) {
    //   console.log("Invalid password attempt");
    //   return res.status(401).json({ message: "Invalid Password" });
    // }

    //  Create JWT Token
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );

    console.log("jwt token:", token);
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      email,
      name: user.name,
    });
  } catch (err) {
    console.log("Login error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  res.json("Logged out successfully");
};
