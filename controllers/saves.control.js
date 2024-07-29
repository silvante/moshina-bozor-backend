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

const saveCarByID = async (req, res) => {
  const id = req.params.id;
  try {
    const { token } = req.cookies;
    if (!token) {
      res.send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        const save = await Save.create({ user: userDoc.id, car: id });
        res.status(200).send(save);
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const unsaveCarByID = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Save.findByIdAndDelete(id);
    if (!deleted) {
      res.send("save is not defined");
    }
    res.send(203).send("delete success!");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = {
  getUsersSaves,
  saveCarByID,
  unsaveCarByID,
};
