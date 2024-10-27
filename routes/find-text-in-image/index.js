const express = require("express");
const router = express.Router();

const multer = require("multer");
const uploadAndExtractContext = require("../../functions/context-generator");
//set storage folder and upload name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
//Text in Image
router.post(
  "/highlight-coordinates",
  upload.single("image"),
  async (req, res) => {
    const { query } = req.body;
    const { mimetype, filename } = req.file;
    if (
      mimetype === "image/jpeg" ||
      mimetype === "image/webp" ||
      mimetype === "image/png" ||
      mimetype === "image/heic" ||
      mimetype === "image/heif"
    ) {
      const result = await uploadAndExtractContext({
        imagePath: `./images/${filename}`,
        mimeType: mimetype,
        imageName: filename,
        queryText: query,
      });
      // console.log({ file });
      res.status(200).send({
        success: true,
        message: "request parced successfully",
        result: result,
      });
    } else {
      res.status(401).send({
        success: false,
        message: "request failed",
        reason: "unacceptable image format",
      });
    }
  }
);

module.exports = router;
