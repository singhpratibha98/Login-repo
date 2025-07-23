const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../Controller/authController");
const EmployeeModel = require("../models/EmployeeModel");
const { validateRegister, validateLogin } = require("../Middlware/Validation");
const { handleValidation } = require("../Middlware/handleValidation");
const { protect } = require("../Middlware/authMiddleware");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

router.post("/register", validateRegister, handleValidation, register);
router.post("/login", validateLogin, handleValidation, login);
router.post("/logout", protect, logout);

module.exports = router;
