const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  verificated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  mobile: {
    type: String,
  },
  telegram: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
