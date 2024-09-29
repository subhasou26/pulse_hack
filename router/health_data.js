const express = require('express');
const router = express.Router();
const UserHealthRecord = require('../models/UserHealthRecord');
const {auth}=require("../middleware/auth");

// Update user's health data after signup
router.post('/updateHealthData', auth,async (req, res) => {
    try {
      const { email, age, height, weight, bmi, pressure, sugar, cholesterol } = req.body;
      console.log(req.body)
      // Find user by ID
      const user = await UserHealthRecord.findOne({email})
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Add the health data with the current date
      user.healthData.push({
        date: new Date(),
        age,
        height,
        weight,
        bmi,
        pressure: {
          systolic: pressure.systolic,
          diastolic: pressure.diastolic,
        },
        sugar: {
          fasting: sugar.fasting,
          postMeal: sugar.postMeal,
        },
        cholesterol: {
          total: cholesterol.total,
          hdl: cholesterol.hdl,
          ldl: cholesterol.ldl,
          triglycerides: cholesterol.triglycerides,
        }
      });
  
      // Save updated user data
      await user.save();
  
      res.status(200).json({ message: 'Health data updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating health data' });
    }
  });
  

  // Fetch user health data
  router.get("/show",(req,res)=>{
    res.render("update_health.ejs");
  })
  router.get("/prediction",(req,res)=>{
    res.render("form.ejs");
  })
router.get('/getHealthData/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Find user by ID
      const user = await UserHealthRecord.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Return health data
      res.status(200).json(user.healthData);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching health data' });
    }
  });
  
 
  
  module.exports = router;
  