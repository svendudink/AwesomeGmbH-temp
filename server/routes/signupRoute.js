import { signUp } from "../controller/signup.js";
import express from "express";

const router = express.Router();

router.post("/", signUp);

export default router;
