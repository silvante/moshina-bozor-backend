const express = require("express");
const {
  getUsersSaves,
  saveCarByID,
  unsaveCarByID,
} = require("../controllers/saves.control");
const router = express.Router();

// get all user's saves
router.get("/", getUsersSaves);

/**
 * @swagger
 * /api/saves:
 *   get:
 *     tags: [Saves]
 *     summary: Get all user's saves
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: A list of user's saved cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Save'
 *       500:
 *         description: Server error
 */

// create user's save
router.post("/:id", saveCarByID);

/**
 * @swagger
 * /api/saves/{id}:
 *   post:
 *     tags: [Saves]
 *     summary: Save a car for a user
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The User ID to save the car for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveInput'
 *           example:
 *             car: "60d21b4667d0d8992e610c85"
 *             user: "60d21b4667d0d8992e610c84"
 *     responses:
 *       201:
 *         description: Car saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Save'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */

// delete save by id
router.delete("/:id", unsaveCarByID);

/**
 * @swagger
 * /api/saves/{id}:
 *   delete:
 *     tags: [Saves]
 *     summary: Unsave a car by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Save ID to unsave the car
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Save removed successfully
 *       404:
 *         description: Save not found
 *       500:
 *         description: Server error
 */

module.exports = router;
