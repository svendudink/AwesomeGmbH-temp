import express from "express";
import multer from "multer";
import { fileEdit } from "../controller/upload.js";

const router = express.Router();

const fileUpload = multer({
  dest: "csvuploads/",
  preservePath: true,
});

router.post(
  "/",

  fileUpload.single("file"),
  fileEdit
);

export default router;
