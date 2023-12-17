import express from "express";

import {
  getNetEarningsLast30Days,
  monthlyEarning,
  featuredMonth,
} from "../controllers/Stat.js";
const router = express.Router();

router.get("/net_earning", getNetEarningsLast30Days);
router.get("/monthly_earning", monthlyEarning);
router.get("/featured_month", featuredMonth);

export default router;
