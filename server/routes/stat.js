import express from "express";

import { getNetEarningsLast30Days } from "../controllers/Stat.js";
const router = express.Router();

router.get("/net_earning", getNetEarningsLast30Days);

export default router;
