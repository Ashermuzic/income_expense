import { query } from "express";
import { db } from "../db.js";

export const getGoals = (req, res) => {
  const q = "SELECT * FROM general_goal";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getGoal = (req, res) => {
  const goalId = req.params.id;

  const q = "SELECT * FROM general_goal WHERE goal_id = ?";

  db.query(q, [goalId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addGoal = (req, res) => {
  const q =
    "INSERT INTO general_goal (goal_name, target_price, start_date, deadline_date, description) VALUES (?, ?, ?, ?, ?)";

  const values = [
    req.body.goal_name,
    req.body.target_price,
    req.body.start_date,
    req.body.deadline_date,
    req.body.description,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    res.status(200).json("Goal has been created");
  });
};

export const deletedGoal = (req, res) => {
  const goalId = req.params.id;

  const q = "DELETE FROM general_goal WHERE goal_id =?";

  db.query(q, [goalId], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json("Goal has been deleted.");
  });
};
