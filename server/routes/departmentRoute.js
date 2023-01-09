import express from "express";
import { departments } from "../controller/departmentRegistry.js";

const router = express.Router();

router.post("/", departments);
router.post("/save", departments);
//router.post("/save", employeeRegistrySave);

export default router;
