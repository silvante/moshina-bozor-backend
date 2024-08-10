const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.DB_URL,
  // options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/tiff",
      "image/gif",
      "image/svg",
      "image/eps",
    ];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-moshina-bozor-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
