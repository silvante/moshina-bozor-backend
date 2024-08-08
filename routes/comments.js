const express = require("express");
const {
  getComments,
  getComment,
  addComment,
  editComment,
  deleteComment,
} = require("../controllers/comment.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */

// get all Comments
router.get("/", getComments);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     tags: [Comments]
 *     summary: Retrieve all comments
 *     responses:
 *       200:
 *         description: List of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Server error
 */

// create Comment
router.post("/", addComment);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Create a new comment
 *     security:
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *           example:
 *             name: "John Doe"
 *             rating: 5
 *             comment: "Great product!"
 *             liked: []
 *             brandName: "ExampleBrand"
 *             writtenBy: "60d21b4667d0d8992e610c84"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */

// get a Comment by id
router.get("/:id", getComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     tags: [Comments]
 *     summary: Retrieve a comment by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

// edit Comment by id
router.put("/:id", editComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Update a comment by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *           example:
 *             name: "John Doe"
 *             rating: 4
 *             comment: "Updated review."
 *             liked: []
 *             brandName: "ExampleBrand"
 *             writtenBy: "60d21b4667d0d8992e610c84"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

// delete Comment by id
router.delete("/:id", deleteComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

// schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the person who made the comment
 *         rating:
 *           type: integer
 *           description: Rating given in the comment (0-5)
 *         comment:
 *           type: string
 *           description: The comment text
 *         liked:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *           description: List of user IDs who liked the comment
 *         brandName:
 *           type: string
 *           description: Name of the brand related to the comment
 *         writtenBy:
 *           type: string
 *           format: uuid
 *           description: User ID of the person who wrote the comment
 *       required:
 *         - name
 *         - rating
 *         - comment
 *         - brandName
 *         - writtenBy
 */

module.exports = router;
