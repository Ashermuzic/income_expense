import express from "express";

import {
  Login,
  getOwner,
  editOwner,
  getSingleOwner,
} from "../controllers/Auth.js";
const router = express.Router();

router.post("/", Login);
router.get("/", getOwner);
router.get("/:id", getSingleOwner);
router.put("/:id", editOwner);

export default router;
