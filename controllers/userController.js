const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "got all users",
      userCount:users.length,
      users
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "get all users api error",
      error
    });
  }
};

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "please fill all fields",
      });
    }
    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "user already registered",
      });
    }
    //hashing password
    const hashedPassword = await bcrypt.hash(password,10);
    //save new user
    const newUser = new userModel({ username, email, password:hashedPassword });
    await newUser.save();
    const token =newUser.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
      httpOnly: true,
    };

    return res.status(200).cookie("token", token, options).send({
      success: true,
      message: "registration successful",
      newUser,token
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

exports.loginController = async(req,res) => {
  try {
    const {email,password} = req.body;
    //validation
    if(!email || !password){
        return res.status(400).send({
            success: false,
            message: "please provide email and password",
          });
    }
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).send({
            success: false,
            message: "email is not registered",
          });
    }
    //password check
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).send({
            success: false,
            message: "invalid username or password",
          });
    }
    const token =user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 3600 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).send({
      success: true,
      message: "login successful",
      user,token
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "login api error",
      error
    });
  }
};
