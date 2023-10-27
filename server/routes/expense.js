import express from "express";
import multer from "multer";
import path from "path";

import {
  getExpenses,
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
  getExpensesCat,
  countExpenses,
} from "../controllers/Expense.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/attachments");
  },
  filename: (req, file, cb) => {
    console.log("this is the file" + file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", getExpenses);
router.get("/count", countExpenses);
router.get("/cat/", getExpensesCat);
router.get("/:id", getExpense);
router.post("/", upload.single("file"), addExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
