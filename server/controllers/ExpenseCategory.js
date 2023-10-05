import { query } from "express";
import { db } from "../db.js";

export const getCategories = (req, res) => {
  const q = "SELECT * FROM expense_categories";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const deleteCategory = (req, res) => {
  const postId = req.params.id;

  const q = "DELETE FROM expense_categories WHERE `category_id` = ?";

  db.query(q, [postId], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.json("Category has been deleted.");
  });
};

export const addCategory = (req, res) => {
  const q = "INSERT INTO expense_categories (category_name) VALUES (?)";

  const values = [req.body.category_name];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    res.status(200).json("Category has been created");
  });
};
