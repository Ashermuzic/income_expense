import express from "express";

import {
  getInfos,
  getInfo,
  deleteInfo,
  createInfo,
} from "../controllers/LegalInfo.js";
const router = express.Router();

router.get("/", getInfos);
router.get("/:id", getInfo);
router.post("/", createInfo);
router.delete("/:id", deleteInfo);

export default router;
