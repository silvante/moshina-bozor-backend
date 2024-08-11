require("dotenv").config();
const connectdb = require("./db");
const express = require("express");
const cors = require("cors");
const cp = require("cookie-parser");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const swaggerDocs = require("./swagger");
const swaggerUI = require("swagger-ui-express");

// gridfs

let gfs;

// connecting to the database
connectdb();

// extra functions
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.DOMAIN,
  })
);
app.use(cp());

// swagger

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// requiring routes
const { router } = require("./routes/extraRoutes");
const user = require("./routes/user");
const car = require("./routes/car");
const upload = require("./routes/upload");
const comment = require("./routes/comments");
const saves = require("./routes/save");

// using routes
app.use("/", router);
app.use("/api/users", user);
app.use("/api/cars", car);
app.use("/file", upload);
app.use("/api/comments", comment);
app.use("/api/saves", saves);

// gridfs
const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

// crud files
app.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

/**
 * @swagger
 * /file/{filename}:
 *   get:
 *     tags: [File Management]
 *     summary: Retrieve a file by filename
 *     parameters:
 *       - name: filename
 *         in: path
 *         required: true
 *         description: The name of the file to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Not found"
 *       500:
 *         description: Server error
 */

app.delete("/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

/**
 * @swagger
 * /file/{filename}:
 *   delete:
 *     tags: [File Management]
 *     summary: Delete a file by filename
 *     parameters:
 *       - name: filename
 *         in: path
 *         required: true
 *         description: The name of the file to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Success"
 *       404:
 *         description: File not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "File not found"
 *       500:
 *         description: Server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "An error occurred."
 */

// main route
app.get("/", (req, res) => {
  res.send([
    {
      project_name: "Moshina bozor uz",
    },
    "API",
    {
      users: "/api/users",
      cars: "/api/cars",
      comments: "/api/comments",
      saves: "/api/saves",
    },
    "AUTH",
    {
      forCreating: "/api/users",
      forLogin: "/login",
      forSave: "/profile",
      forLogout: "/logout",
    },
    "UPLOAD",
    {
      forUploadImages: "/file/upload",
      forFindingtheimage: "/file/:filename",
      forDeletingFile: "/file/:filename",
    },
    "OTP verification",
    {
      verify: "/api/users/verifyOTP",
      resend: "/api/users/resendOTP",
    },
  ]);
});

// listening a port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`started to listen port - ${port}`);
});
