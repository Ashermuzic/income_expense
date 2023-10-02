import { query } from "express";
import { db } from "../db.js";

export const getProducts = (req, res) => {
  const q = "SELECT * FROM products";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getProduct = (req, res) => {
  const q = "SELECT * FROM products WHERE product_id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addProduct = (req, res) => {
  const q =
    "INSERT INTO products (product_name, amount, description, category_id ) VALUES (?, ?, ?, ?)";

  const values = [
    req.body.product_name,
    req.body.amount,
    req.body.description,
    req.body.category_id,
  ];

  console.log(values);

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    res.status(200).json("Product has been created");
  });
};

export const updateProduct = (req, res) => {
  const productId = req.params.id; // Assuming you are passing the product_id as a URL parameter
  const newProductName = req.body.product_name;
  const newDescription = req.body.description;

  const q =
    "UPDATE products SET product_name=?, description=? WHERE product_id=?";

  const values = [newProductName, newDescription, productId];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Product has been updated.");
  });
};

export const deleteProduct = (req, res) => {
  const postId = req.params.id;

  const q = "DELETE FROM products WHERE `product_id` = ?";

  db.query(q, [postId], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.json("Product has been deleted.");
  });
};
