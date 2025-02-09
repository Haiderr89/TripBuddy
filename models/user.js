const mongoose = require("mongoose");
// import { Timestamp } from '../node_modules/bson/src/timestamp';

const tripSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Visited', 'Want to visit'],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  activities: {
    type: String,
    enum: [''],
  },
  bestSeason: {
    type: String,
  },
  budget: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
  },
  description: {
    type: String
  }
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  trips: [tripSchema],
}, { timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;