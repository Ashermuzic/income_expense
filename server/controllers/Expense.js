import { query } from "express";
import { db } from "../db.js";
import path from "path";

export const getExpenses = (req, res) => {
  const q =
    "SELECT e.expense_id AS id, e.*, ec.category_name " +
    "FROM expense e " +
    "LEFT JOIN expense_categories ec ON e.expense_category = ec.category_id";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getExpensesCat = (req, res) => {
  const q = "SELECT * FROM expense_categories";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getExpense = (req, res) => {
  const expenseId = req.params.id;

  const q =
    "SELECT e.*, ec.category_name " +
    "FROM expense e " +
    "LEFT JOIN expense_categories ec ON e.expense_category = ec.category_id " +
    "WHERE e.expense_id = ?";

  db.query(q, [expenseId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const updateExpense = (req, res) => {
  const expenseId = req.params.id;
  const { description, provider_name, provider_info } = req.body;

  // Construct the SQL query to update the specified fields of an expense record
  const q =
    "UPDATE expense SET description = ?, provider_name = ?, provider_info = ? WHERE expense_id = ?";

  const values = [description, provider_name, provider_info, expenseId];

  // Execute the query to update the expense record
  db.query(q, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ message: "Expense updated successfully" });
  });
};

export const deleteExpense = (req, res) => {
  const expenseId = req.params.id;

  const q = "DELETE FROM expense WHERE expense_id = ?";

  db.query(q, [expenseId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json({ message: "Expense deleted successfully" });
  });
};

export const addExpense = (req, res) => {
  const {
    expense_name,
    amount,
    price,
    description,
    date,
    expense_category,
    provider_name,
    provider_info,
  } = req.body;

  // Get the uploaded file name from req.file if multer is configured correctly
  const attachment_name = req.file ? path.basename(req.file.filename) : null;

  // Construct the SQL query to insert a new expense record
  const q =
    "INSERT INTO expense (expense_name, amount, price, description, date, attachment_name, expense_category, provider_name, provider_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    expense_name,
    amount,
    price,
    description,
    date,
    attachment_name,
    expense_category,
    provider_name,
    provider_info,
  ];

  // Execute the query to insert the expense record
  db.query(q, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(201).json({
      message: "Expense added successfully",
    });
  });
};

export const countExpenses = (req, res) => {
  const q = "SELECT count(expense_id) as expenses FROM expense";

  db.query(q, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
};
