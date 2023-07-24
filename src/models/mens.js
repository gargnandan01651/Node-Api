const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const menDetails = new mongoose.Schema({
  ranking: {
    type: Number,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  score: {
    type: Number,
    required: true,
    trim: true,
  },
  event: {
    type: String,
    default: "100m",
  },
});

const MensRanking = new mongoose.model("MenRanking", menDetails);
module.exports = MensRanking;
