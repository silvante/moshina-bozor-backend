const Save = require("../models/saves.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");

const getUsersSaves = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        const saves = await Save.find({ user: userDoc.id });
        if (!saves) {
          res.status(404).send("user has no comment");
        }
        res.status(200).send(saves);
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = {
  getUsersSaves,
};
