import express from "express";
import { employeeRegistry } from "../controller/employeeRegistry.js";

const router = express.Router();

router.post("/", employeeRegistry);
//router.post("/save", employeeRegistry);

export default router;
