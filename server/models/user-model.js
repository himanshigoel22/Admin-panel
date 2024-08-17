const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

//secure password
userSchema.pre("save" , async function(next){
    const user = this;

    if(!user.isModified("password")){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, saltRound);
    } catch (error) {
        next(error);
    }
})

//json web token 
userSchema.methods.generateToken = async function () {
    try {
      const token = jwt.sign({
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d"
      });
      return token;
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };
  

const User = new mongoose.model("User" , userSchema);

module.exports = User;