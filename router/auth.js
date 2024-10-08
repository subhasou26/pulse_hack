const express = require('express');
const router = express.Router();
const UserHealthRecord = require('../models/UserHealthRecord'); // Assuming the model is stored in models/UserHealthRecord
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {auth}=require("../middleware/auth")
// User signup (initial data)
router.get("/login",(req,res)=>{
  res.render("signup_login.ejs");
});
router.post("/login",async(req,res)=>{
    const { email, password } = req.body;

  try {
    const login_user = await UserHealthRecord.findOne({ email });
    if (!login_user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, login_user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: login_user._id,},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000, // 5 hour
      sameSite: "Strict",
    });
    
    res.render("profile.ejs",{login_user});
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
})
router.get("/profile",auth,async(req,res)=>{
  const user_id= req.user.id;
  const login_user = await UserHealthRecord.findById(user_id);
  res.render("profile.ejs",{login_user});
  
})
router.get("/fitness",(req,res)=>{
  res.render("fitnes.ejs");
})
router.post('/signup', async (req, res) => {
  try {
   
    const { name, contactNumber, email, password, bloodGroup } = req.body;
    let user=await UserHealthRecord.findOne({email});
    if(user){
        return res.status(400).json({ msg: "User already exists" });

    }
    // Create a new user record
    const newUser = new UserHealthRecord({
      name,
      contactNumber,
      email,
      password:await bcrypt.hash(password, 10), // In practice, you should hash the password using something like bcrypt
      bloodGroup
    });

    // Save the user to the database
    await newUser.save();
    
    res.redirect("http://localhost:5000/");
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;