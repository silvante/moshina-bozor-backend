const express = require("express");
const {
  getComments,
  getComment,
  addComment,
  editComment,
  deleteComment,
} = require("../controllers/comment.controller");

const router = express.Router();

// get all Comments
router.get("/", getComments);

// get a Comment by id
router.get("/:id", getComment);

// create Comment
router.post("/", addComment);

// edit Comment by id
router.put("/:id", editComment);

// delete Comment by id
router.delete("/:id", deleteComment);

module.exports = router;
