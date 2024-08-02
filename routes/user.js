const express = require("express");
const {
  getUser,
  getUsers,
  addUser,
  editUser,
  deleteUser,
  verifyOTP,
} = require("../controllers/user.controller");
const router = express.Router();

// get all users
router.get("/", getUsers);

// get a user by id
router.get("/:id", getUser);

// create user
router.post("/", addUser);

// edit user by id
router.put("/:id", editUser);

// delete user by id
router.delete("/:id", deleteUser);

// verify otp
router.post("/verifyOTP", verifyOTP);

module.exports = router;
