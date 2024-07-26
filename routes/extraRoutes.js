const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user.model");
const Comment = require("../models/comments.model");
const jwtSecret = "moshina_bozor_d34DJ058jsllass345dd";

const uploadDir = path.join("..", "/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// login part codes
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passwordOk = bcryptjs.compareSync(password, userDoc.password);
      if (passwordOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("password is not ok");
      }
    } else res.json("not found");
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

// profile part codes
router.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        const {
          _id,
          email,
          username,
          name,
          mobile,
          telegram,
          bio,
          avatar,
          verificated,
        } = await User.findById(userDoc.id);
        res.json({
          _id,
          email,
          username,
          name,
          mobile,
          telegram,
          bio,
          avatar,
          verificated,
        });
      });
    } else {
      res.json(null);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// log out part codes
router.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// like a comment
router.put("/like-comment/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(400).send("you are not logged in");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        const likedComment = await Comment.findByIdAndUpdate(id, {
          liked: [...liked, userDoc.id],
        });
        res.status(202).send(likedComment);
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = { router, jwtSecret };
