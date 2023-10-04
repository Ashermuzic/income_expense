import { query } from "express";
import { db } from "../db.js";

export const getIncomes = (req, res) => {
  const q =
    "SELECT i.income_id AS id, i.*, p.product_name, p.product_img, c.category_name " +
    "FROM income i " +
    "INNER JOIN products p ON i.product_id = p.product_id " +
    "INNER JOIN income_categories c ON p.category_id = c.category_id";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getIncome = (req, res) => {
  const incomeId = req.params.id; // Assuming you pass income_id as a URL parameter

  const q =
    "SELECT i.income_id AS id, i.*, p.product_name, p.product_img, c.category_name " +
    "FROM income i " +
    "INNER JOIN products p ON i.product_id = p.product_id " +
    "INNER JOIN income_categories c ON p.category_id = c.category_id " +
    "WHERE i.income_id = ?";

  db.query(q, [incomeId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addIncome = (req, res) => {
  const productId = req.body.product_id;
  const soldAmount = req.body.amount;
  const salePrice = req.body.price;
  const saleDate = req.body.date;
  const saleDescription = req.body.description;

  // Start a database transaction to ensure data consistency
  db.beginTransaction((err) => {
    if (err) return res.status(500).json(err);

    // Step 1: Insert a record into the income table to record the sale
    const insertIncomeQuery =
      "INSERT INTO income (product_id, amount, price, date, description) VALUES (?, ?, ?, ?, ?)";

    const incomeValues = [
      productId,
      soldAmount,
      salePrice,
      saleDate,
      saleDescription,
    ];

    db.query(insertIncomeQuery, incomeValues, (err, result) => {
      if (err) {
        // Rollback the transaction if there's an error
        db.rollback(() => {
          return res.status(500).json(err);
        });
      } else {
        // Step 2: Deduct the sold amount from the product's amount in the products table
        const updateProductQuery =
          "UPDATE products SET amount = amount - ? WHERE product_id = ?";

        const productValues = [soldAmount, productId];

        db.query(updateProductQuery, productValues, (err, updateResult) => {
          if (err) {
            // Rollback the transaction if there's an error
            db.rollback(() => {
              return res.status(500).json(err);
            });
          } else {
            // Commit the transaction if everything is successful
            db.commit((err) => {
              if (err) {
                return res.status(500).json(err);
              }

              return res.status(200).json("Sale recorded successfully.");
            });
          }
        });
      }
    });
  });
};
