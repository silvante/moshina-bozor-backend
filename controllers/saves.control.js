const jwt = require("jsonwebtoken");
const Save = require("../models/saves.model");
const { jwtSecret } = require("../routes/extraRoutes");

const getUsersSaves = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      res.send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        try {
          const saves = await Save.find({ user: userDoc.id }).populate("car");
          if (!saves) {
            res.status(404).send("user has no comment");
          }
          res.status(200).send(saves);
        } catch (err) {
          console.log(err);
          res.send(err);
        }
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
    const token = req.header("Authorization").replace("Bearer ", "");
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
    await Save.findByIdAndDelete(id);
    res.send("delete success!");
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
