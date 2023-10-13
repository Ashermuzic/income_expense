import express from "express";

import {
  getGoals,
  getGoal,
  addGoal,
  deletedGoal,
} from "../controllers/Goal.js";
const router = express.Router();

router.get("/", getGoals);
router.get("/:id", getGoal);
router.post("/", addGoal);
router.delete("/:id", deletedGoal);

export default router;
