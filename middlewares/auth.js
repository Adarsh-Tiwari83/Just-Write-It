const User = require("../models/userModel");
const jwt = require("jsonwebtoken");



exports.isAuthenticated = async (req, res, next) => {
  try {
    // const token=req.get('Cookie').substring(6,156); //cookie parser kaam nhi kar rha tha
    const token=req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET); //decoded contains id
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
