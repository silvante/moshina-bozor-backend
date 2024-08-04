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

// login part codes
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("User not found");
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {});

  res.json(token);
});

// profile part codes
router.get("/profile", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
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
    const comment = await Comment.findById(id);
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      res.status(400).send("you are not logged in");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        if (comment.liked.includes(userDoc.id)) {
          res.send("you have already liked to this post");
        }
        const likedComment = await Comment.findByIdAndUpdate(id, {
          $push: { liked: userDoc.id },
        });
        res.status(202).send(likedComment);
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.put("/dislike-comment/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findById(id);
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      res.status(400).send("you are not logged in");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        if (!comment.liked.includes(userDoc.id)) {
          return;
        }
        const likedComment = await Comment.findByIdAndUpdate(id, {
          $pull: { liked: userDoc.id },
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
