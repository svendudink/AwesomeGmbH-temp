import express from "express";
import { upload } from "../controller/upload.js";
import multer from "multer";
import fs from "fs";
import toJSON from "../controller/upload.js";
const router = express.Router();

const fileUpload = multer({
  dest: "csvuploads/",
  preservePath: true,
});

router.post(
  "/",

  fileUpload.single("file"),

  function (req, res, cb) {
    try {
      console.log("req.file", req.file);
      const fileName = `uploads/${Date.now()}${req.file.originalname}`;

      fs.rename(`csvuploads/${req.file.filename}`, fileName, function (err) {
        if (err) console.log("ERROR: " + err);
      });
      toJSON(fileName);
    } catch {
      console.log("error");
    }
    return null;
  }
);

export default router;
