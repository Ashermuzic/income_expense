import { query } from "express";
import { db } from "../db.js";
import path from "path";

export const getInfos = (req, res) => {
  const q = "SELECT * FROM legal_info";

  db.query(q, (err, result) => {
    if (err) {
      // Handle the error
      return res.status(500).json({ error: "An error occurred" });
    }

    return res.status(200).json(result);
  });
};

export const getInfo = (req, res) => {
  const info_id = req.params.id;
  const q = "SELECT * FROM legal_info WHERE info_id = ?";

  db.query(q, [info_id], (err, result) => {
    if (err) {
      // Handle the error
      return res.status(500).json({ error: "An error occurred" });
    }

    return res.status(200).json(result);
  });
};

export const createInfo = (req, res) => {
  const { info_title, info_content } = req.body;
  const q = "INSERT INTO legal_info (info_title, info_content) VALUES (?, ?)";

  db.query(q, [info_title, info_content], (err, result) => {
    if (err) {
      // Handle the error
      return res.status(500).json({ error: "An error occurred" });
    }

    const newInfoId = result.insertId;
    return res
      .status(201)
      .json({ message: "Info created successfully", info_id: newInfoId });
  });
};

export const deleteInfo = (req, res) => {
  const info_id = req.params.id;
  const q = "DELETE FROM legal_info WHERE info_id = ?";

  db.query(q, [info_id], (err, result) => {
    if (err) {
      // Handle the error
      return res.status(500).json({ error: "An error occurred" });
    }

    if (result.affectedRows === 0) {
      // If no rows were affected, it means there's no record with the provided info_id
      return res.status(404).json({ message: "Info not found" });
    }

    return res.status(200).json("Info deleted successfully");
  });
};
