const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Saves = require("./saves.model");

const carSchema = Schema({
  ism: {
    type: String,
    required: true,
  },
  telefon: {
    type: String,
    required: true,
  },
  narx: {
    type: Number,
    required: true,
  },
  marka: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  yil: {
    type: Number,
    required: true,
  },
  probeg: {
    type: Number,
    required: true,
  },
  manzil: {
    type: String,
    required: true,
  },
  rang: {
    type: String,
    required: true,
  },
  qoshimchaMalumotlar: {
    type: String,
    required: true,
  },
  rasimlar: [String],
  ega: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

carSchema.pre("remove", async function (next) {
  try {
    const car = this._id;

    await Saves.deleteMany({ car });
  } catch (error) {
    next(error);
  }
});

const Car = mongoose.model("car", carSchema);

module.exports = Car;
