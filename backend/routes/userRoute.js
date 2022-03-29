const express = require("express");
const {
  userRegister,
  authoriseUser,
} = require("../controllers/userController");
const User = require("../models/userModel");

const Router = express();

Router.post("/register", userRegister); // for creating new user
Router.post("/", authoriseUser);

module.exports = Router;
