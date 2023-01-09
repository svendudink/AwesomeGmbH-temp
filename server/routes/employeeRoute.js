import express from "express";
import { employeeRegistry } from "../controller/employeeRegistry.js";
import { employeeRegistrySave } from "../controller/employeeRegistrySave.js";

const router = express.Router();

router.post("/", employeeRegistry);
router.post("/save", employeeRegistrySave);

export default router;
