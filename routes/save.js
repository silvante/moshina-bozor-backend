const express = require("express");
const { getUsersSaves } = require("../controllers/saves.control");
const router = express.Router();

// get all users
router.get("/", getUsersSaves);

// get a user by id
// router.get("/:id", getUser);

// create user
// router.post("/", addUser);

// edit user by id
// router.put("/:id", editUser);

// delete user by id
// router.delete("/:id", deleteUser);

module.exports = router;
