const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const paramsConfig = require("../utils/params-config");

// Prime s3 for operation
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
});

// multer holds the image file until it's ready to upload to S3
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

// multer then gives us the storage destination with "image" being the key for upload.
const upload = multer({ storage }).single("image");

router.post("/image-upload", upload, (req, res) => {
  // set up params config imported from "utils/params-config"
  const params = paramsConfig(req.file);

  // set up S3 service call
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.json(data);
  });
});
module.exports = router;
