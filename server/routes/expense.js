import express from "express";

import {
  getExpenses,
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../controllers/Expense.js";
const router = express.Router();

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.post("/", addExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
