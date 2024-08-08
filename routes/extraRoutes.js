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

  if (user.verificated !== true) {
    res.status(400).send("your account is not verified");
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {});

  res.send(token);
});

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Authentication]
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password
 *           example:
 *             email: "user@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid credentials or account not verified
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Invalid credentials"
 *       500:
 *         description: Server error
 */

// profile part codes
router.get("/profile", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (token) {
      try {
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
      } catch (error) {
        console.log(err);
        res.send(err);
      }
    } else {
      res.json(null);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

/**
 * @swagger
 * /profile:
 *   get:
 *     tags: [Authentication]
 *     summary: Get user profile
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: User profile information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   format: uuid
 *                 email:
 *                   type: string
 *                   format: email
 *                 username:
 *                   type: string
 *                 name:
 *                   type: string
 *                 mobile:
 *                   type: string
 *                 telegram:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                 verificated:
 *                   type: boolean
 *       401:
 *         description: Unauthorized access
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       500:
 *         description: Server error
 */

// log out part codes
router.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

/**
 * @swagger
 * /logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Log out a user
 *     responses:
 *       200:
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /like-comment/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Like a comment
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the comment to like
 *         schema:
 *           type: string
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       202:
 *         description: Comment liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Not logged in or already liked
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "You are not logged in or you have already liked this post"
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /dislike-comment/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Dislike a comment
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the comment to dislike
 *         schema:
 *           type: string
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       202:
 *         description: Comment disliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Not logged in or comment not liked
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "You are not logged in or you have not liked this post"
 *       500:
 *         description: Server error
 */

module.exports = { router, jwtSecret };
