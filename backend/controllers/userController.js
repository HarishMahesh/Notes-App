const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateJwtToken = require("../config/generateJwtToken");

const userRegister = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "required fileds input missing" });
  }

  let isEmailAvailable = await User.findOne({ email: email });

  if (isEmailAvailable) {
    res.status(400).json({ message: "Email allready exists" });
    //throw new Error("Email allready exists");
  }

  let encryptedPassword = await bcrypt.hash(password, 10);

  try {
    // to create a document in the db
    let userCreated = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    if (userCreated) {
      res.status(201).json({
        name: userCreated.name,
        _id: userCreated._id,
        email: userCreated.email,
        token: generateJwtToken(userCreated._id),
      });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const authoriseUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        name: user.name,
        _id: user._id,
        email: user.email,
        token: generateJwtToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
      // throw new Error("Invalid username or password");
    }
  } catch (err) {
    res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = { userRegister, authoriseUser };
