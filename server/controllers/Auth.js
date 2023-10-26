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

export const getOwner = (req, res) => {
  const q =
    "SELECT user_id, username, company_name, phone, email, address, role FROM users";

  db.query(q, (err, result) => {
    if (err) {
      // Handle the error
      return res.status(500).json({ error: "An error occurred" });
    }

    return res.status(200).json(result);
  });
};

export const getSingleOwner = (req, res) => {
  // Get the user_id from the request parameters
  const user_id = req.params.id; // Assuming you are using Express or a similar framework

  // Create the SQL query with a parameterized query
  const q =
    "SELECT user_id, username, company_name, phone, email, address, role FROM users WHERE user_id = ?";

  // Execute the query with the user_id as a parameter
  db.query(q, [user_id], (err, result) => {
    if (err) {
      // Handle the error
      return res.status(500).json({ error: "An error occurred" });
    }

    if (result.length === 0) {
      // Handle the case where no owner was found with the given user_id
      return res.status(404).json({ error: "Owner not found" });
    }

    // Return the owner data (there should be only one result since it's a single owner query)
    return res.status(200).json(result[0]);
  });
};

export const editOwner = (req, res) => {
  // Assuming you send the updated user data in the request body
  const { user_id, username, company_name, phone, email, address, role } =
    req.body;

  // Check if all required data is provided in the request body
  if (
    !user_id ||
    !username ||
    !company_name ||
    !phone ||
    !email ||
    !address ||
    !role
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required user data." });
  }

  const q =
    "UPDATE users SET username = ?, company_name = ?, phone = ?, email = ?, address = ?, role = ? WHERE user_id = ?";

  db.query(
    q,
    [username, company_name, phone, email, address, role, user_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error updating user data." });
      }

      return res
        .status(200)
        .json({ message: "User data updated successfully." });
    }
  );
};
