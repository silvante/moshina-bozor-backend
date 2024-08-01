const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  userid: mongoose.Schema.Types.ObjectId,
  otp: String,
  createdAt: Date,
  expiresAT: Date,
});

const OTP = mongoose.model("otp", otpSchema);
module.exports = OTP;
