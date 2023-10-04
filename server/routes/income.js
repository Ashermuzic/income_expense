import express from "express";

import { getIncomes, addIncome, getIncome } from "../controllers/Income.js";
const router = express.Router();

router.get("/", getIncomes);
router.get("/:id", getIncome);
router.post("/", addIncome);

export default router;
