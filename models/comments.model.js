const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    maxlength: 5,
    minlength: 0,
  },
  comment: {
    type: String,
    required: true,
  },
  liked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  brandName: {
    type: String,
    required: true,
  },
  writtenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
