const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `${process.env.DOMAIN}/file/${req.file.filename}`;
  return res.send(imgUrl);
});

/**
 * @swagger
 * /file/upload:
 *   post:
 *     tags: [File Upload]
 *     summary: Upload a single file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "https://example.com/file/filename.ext"
 *       400:
 *         description: No file selected
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "You must select a file."
 *       500:
 *         description: Server error
 */

module.exports = router;
