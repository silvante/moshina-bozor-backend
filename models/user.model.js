const mongoose = require("mongoose");
const Car = require("./car_model");
const Saves = require("./saves.model");
const Comment = require("./comments.model");
const Otp = require("./OTP.model");

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

userSchema.pre("remove", async function (next) {
  try {
    const user = this._id;

    await Car.deleteMany({ ega: user });
  } catch (error) {
    next(error);
  }
});

userSchema.pre("remove", async function (next) {
  try {
    const user = this._id;

    await Otp.deleteMany({ userid: user });
  } catch (error) {
    next(error);
  }
});

userSchema.pre("remove", async function (next) {
  try {
    const user = this._id;

    await Saves.deleteMany({ user });
  } catch (error) {
    next(error);
  }
});

userSchema.pre("remove", async function (next) {
  try {
    const user = this._id;

    await Comment.deleteMany({ writtenBy: user });
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("user", userSchema);
module.exports = User;
