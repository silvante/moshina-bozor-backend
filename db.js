const mongoose = require("mongoose");

module.exports = function connection() {
  try {
    mongoose.connect(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected to database");
  } catch (error) {
    console.log(error);
    console.log("could not connect to database");
  }
};
