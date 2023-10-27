import express from "express";

import {
  getIncomes,
  addIncome,
  getIncome,
  countIncomes,
} from "../controllers/Income.js";
const router = express.Router();

router.get("/", getIncomes);
router.get("/count", countIncomes);
router.get("/:id", getIncome);
router.post("/", addIncome);

export default router;
