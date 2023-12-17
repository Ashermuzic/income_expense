import express from "express";

import {
  getNetEarningsLast30Days,
  monthlyEarning,
  featuredMonth,
  mostRecentTransaction,
} from "../controllers/Stat.js";

const router = express.Router();

router.get("/net_earning", getNetEarningsLast30Days);
router.get("/monthly_earning", monthlyEarning);
router.get("/featured_month", featuredMonth);
router.get("/most_recent_transaction", mostRecentTransaction);

export default router;
