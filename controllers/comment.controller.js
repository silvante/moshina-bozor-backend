const Comment = require("../models/comments.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    if (!comments) {
      res.status(404).send("there is no comment");
    }
    res.status(200).send(comments);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getComment = async (req, res) => {
  const id = req.body.id;
  try {
    const comment = await Comment.find({ _id: id });
    if (!comment) {
      res.status(404).send("comment is not defined");
    }
    return res.status(200).send(comment);
  } catch (err) {
    console.log(err);
    res.status(err);
  }
};

const addComment = async (req, res) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      res.status(404).send("you are not loged in");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) {
          throw err;
        }
        const { name, rating, comment, liked, brandName } = req.body;
        const newComment = await Comment.create({
          name,
          rating,
          comment,
          liked,
          brandName,
          writtenBy: userDoc.id,
        });
        res.status(201).send(newComment);
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const editComment = async (req, res) => {
  const id = res.body.id;
  try {
    const { name, rating, comment, liked, brandName } = req.body;
    const editedComment = await Comment.findByIdAndUpdate(id, {
      name,
      rating,
      comment,
      liked,
      brandName,
    });
    return res.status(202).send(editedComment);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const deleteComment = async (req, res) => {
  const removingCommentId = req.params.id;
  try {
    const deletedComment = await Comment.findByIdAndDelete(removingCommentId);
    if (!deletedComment) {
      res.status(404).send("Comment is not defined...");
    }
    return res.status(203).send(deleteComment);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = {
  getComments,
  getComment,
  addComment,
  editComment,
  deleteComment,
};
