import express from "express";
import { departments } from "../controller/departmentRegistry.js";
import { departmentsSave } from "../controller/departmentRegistrySave.js";

const router = express.Router();

router.post("/", departments);
router.post("/save", departmentsSave);

export default router;
