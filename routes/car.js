const express = require("express");
const router = express.Router();
const {
  getAllCar,
  getCar,
  addNewCar,
  deleteCar,
  updateCar,
} = require("../controllers/car_controller");

// Yangi mashina qo'shish`1
router.get("/", getAllCar);
router.get("/:id", getCar);
router.post("/", addNewCar);
router.delete("/:id", deleteCar);
router.put("/:id", updateCar);

module.exports = router;
