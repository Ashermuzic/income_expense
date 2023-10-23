import { query } from "express";
import { db } from "../db.js";

export const Login = (req, res) => {
  const { username, password } = req.body;

  // Query the database to find the user by username
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];

    // Check if the provided password matches the stored password
    if (password === user.password) {
      // Passwords match; return a success message
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  });
};
