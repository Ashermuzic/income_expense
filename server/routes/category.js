import express from "express";

import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../controllers/Category.js";
const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);

export default router;
