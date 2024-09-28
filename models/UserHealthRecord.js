const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  healthData: [{
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    age: Number,
    height: Number, // in cm
    weight: Number, // in kg
    bmi: Number,
    pressure: {
      systolic: Number,
      diastolic: Number,
    },
    sugar: {
      fasting: Number,
      postMeal: Number,
    },
    cholesterol: {
      total: Number,
      hdl: Number, // high-density lipoprotein
      ldl: Number, // low-density lipoprotein
      triglycerides: Number,
    },
  }],
}, { timestamps: true });

const UserHealthRecord = mongoose.model('UserHealthRecord', healthRecordSchema);

module.exports = UserHealthRecord;
