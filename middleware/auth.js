const jwt = require('jsonwebtoken');
const User=require("../models/UserHealthRecord");
require('dotenv').config();

const auth = (req, res, next) => {
  //const token = req.header('Authorization').replace('Bearer ', '');
  const token=req.cookies.token;
 
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = { auth };