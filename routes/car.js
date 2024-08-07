const express = require("express");
const router = express.Router();
const {
  getAllCar,
  getCar,
  addNewCar,
  deleteCar,
  updateCar,
} = require("../controllers/car_controller");

/**
 * @swagger
 * tags:
 *   - name: Cars
 *     description: API operations related to cars
 */

// Get all cars
router.get("/", getAllCar);
/**
 * @swagger
 * /api/cars:
 *   get:
 *     tags: [Cars]
 *     summary: Retrieve a list of cars
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */

// Get a car by ID
router.get("/:id", getCar);
/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     tags: [Cars]
 *     summary: Retrieve a car by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the car to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 */

// Create a new car
router.post("/", addNewCar);
/**
 * @swagger
 * /api/cars:
 *   post:
 *     tags: [Cars]
 *     summary: Create a new car
 *     security:
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Car created successfully
 *       400:
 *         description: Bad request
 */

// Update a car by ID
router.put("/:id", updateCar);
/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     tags: [Cars]
 *     summary: Update a car by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the car to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 */

// Delete a car by ID
router.delete("/:id", deleteCar);
/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     tags: [Cars]
 *     summary: Delete a car by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the car to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         ism:
 *           type: string
 *           example: "Toyota Corolla"
 *         telefon:
 *           type: string
 *           example: "+998901234567"
 *         narx:
 *           type: number
 *           example: 15000
 *         marka:
 *           type: string
 *           example: "Toyota"
 *         model:
 *           type: string
 *           example: "Corolla"
 *         yil:
 *           type: number
 *           example: 2020
 *         probeg:
 *           type: number
 *           example: 25000
 *         manzil:
 *           type: string
 *           example: "Tashkent, Uzbekistan"
 *         rang:
 *           type: string
 *           example: "Black"
 *         qoshimchaMalumotlar:
 *           type: string
 *           example: "New tires, leather seats"
 *         rasimlar:
 *           type: array
 *           items:
 *             type: string
 *             example: "http://example.com/image1.jpg"
 *         ega:
 *           type: string
 *           example: "64d7e34b3b1f1c4d6f5b0a7f"
 *         __v:
 *           type: integer
 *           example: 0
 *       required:
 *         - ism
 *         - telefon
 *         - narx
 *         - marka
 *         - model
 *         - yil
 *         - probeg
 *         - manzil
 *         - rang
 *         - qoshimchaMalumotlar
 *         - ega
 */

module.exports = router;
