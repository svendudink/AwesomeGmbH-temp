import { verification } from "../controller/verification.js";
import express from "express";

const router = express.Router();

router.post("/", verification);

export default router;
