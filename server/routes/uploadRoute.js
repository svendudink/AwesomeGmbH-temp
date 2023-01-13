import express from "express";
import multer from "multer";
import { upload } from "../controller/upload.js";

const router = express.Router();

const fileUpload = multer({
  dest: "uploads/",
});

router.post("/", fileUpload.single("file"), upload);

export default router;
