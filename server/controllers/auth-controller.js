const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home =(req, res) => {
    res.send('Home route');
  };

//registeration
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userCreated = await User.create({ username, email, password });

    res.status(201).json({
      msg: "User registered",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Internal server error - register" });
  }
};

//login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials: User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials: Incorrect password" });
    }

    res.json({
      msg: "Login successful",
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

//to send user data 

const user = async(req , res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({userData});
  } 
  catch (error) {
    console.log(`error from user route ${error}`);
  }
}

module.exports = {home , register , login , user};

