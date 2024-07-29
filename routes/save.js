const express = require("express");
const {
  getUsersSaves,
  saveCarByID,
  unsaveCarByID,
} = require("../controllers/saves.control");
const router = express.Router();

// get all user's saves
router.get("/", getUsersSaves);

// create user's save
router.post("/:id", saveCarByID);

// delete save by id
router.delete("/:id", unsaveCarByID);

module.exports = router;
