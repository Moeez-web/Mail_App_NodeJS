const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hasedPassword = await bcrypt.hash(req.body.password, 10);
    // If email doesn't exist, create a new user
    const user = new User({
      _id: new mongoose.Types.ObjectId(), // Generate new ObjectId
      name: req.body.name,
      email: req.body.email,
      password: hasedPassword,
      is_verified: req.body.is_verified,
    });

    // Save the user
    const savedUser = await user.save();
    res.status(201).json({
      success: true,
      Message: "User Created Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      Message: error,
    });
  }
};

const signin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        Message: "Invalid Credentials"
      })
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if(!passwordMatch){
        return res.status(404).json({
            success: false,
            Message: "Invalid Credentials"
          })
      }else{
        const token = jwt.sign({ user: user }, 'thereisnospecialkeyeverexistsinthisapplication', {
            expiresIn: '1h',
            });
            res.status(200).json({
                success: true,
                token: token,
                Message: "User logged-in successfully"
             });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      Message: error,
    });
  }
};

const validUser = (re1, res, next)=>{

}

module.exports = { signup, signin, validUser };
