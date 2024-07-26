const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const Car = mongoose.model("car", carSchema);

module.exports = Car;
