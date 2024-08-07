const express = require("express");
const {
  getUser,
  getUsers,
  addUser,
  editUser,
  deleteUser,
  verifyOTP,
  resendOTP,
} = require("../controllers/user.controller");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API operations related to users
 */

/**
 * @swagger
 * tags:
 *   - name: AUTH
 *     description: API operations of auth
 */

// get all users
router.get("/", getUsers);
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   verificated:
 *                     type: boolean
 *                     example: true
 *                   _id:
 *                     type: string
 *                     example: 66b20d3e5983e91c70ff5e31
 *                   name:
 *                     type: string
 *                     example: mardonbek
 *                   username:
 *                     type: string
 *                     example: valentine
 *                   email:
 *                     type: string
 *                     example: khamidov.ko@gmail.com
 *                   password:
 *                     type: string
 *                     example: $2a$08$GotAnggJOpFtk8F3HwpN/OF2ovbiZpTrIfAz.DrlxKRWH1g.WfB1a
 *                   __v:
 *                     type: integer
 *                     example: 0
 */

// get a user by id
router.get("/:id", getUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

// create user
router.post("/", addUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

// edit user by id
router.put("/:id", editUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Edit user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */

// delete user by id
router.delete("/:id", deleteUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

// verify otp
router.post("/verifyOTP", verifyOTP);

/**
 * @swagger
 * /api/users/verifyOTP:
 *   post:
 *     tags: [AUTH]
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *                 description: The OTP to verify
 *                 example: "1234"
 *               userid:
 *                 type: string
 *                 example: "64d7e34b3b1f1c4d6f5b0a7f"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 */

// resend OTP
router.post("/resendOTP", resendOTP);

/**
 * @swagger
 * /api/users/resendOTP:
 *   post:
 *     tags: [AUTH]
 *     summary: Resend OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user to resend OTP to
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         avatar:
 *           type: string
 *         email:
 *           type: string
 *         verificated:
 *           type: boolean
 *         password:
 *           type: string
 *         bio:
 *           type: string
 *         mobile:
 *           type: string
 *         telegram:
 *           type: string
 *       required:
 *         - name
 *         - username
 *         - email
 *         - password
 */

module.exports = router;
