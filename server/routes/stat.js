import express from "express";

import {
  getNetEarningsLast30Days,
  monthlyEarning,
} from "../controllers/Stat.js";
const router = express.Router();

router.get("/net_earning", getNetEarningsLast30Days);
router.get("/monthly_earning", monthlyEarning);

export default router;
