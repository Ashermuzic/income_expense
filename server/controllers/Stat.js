import { query } from "express";
import { db } from "../db.js";
import moment from "moment";

export const getNetEarningsLast30Days = (req, res) => {
  // Calculate the date 30 days ago from today
  const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");

  // Query to calculate the total income for the last 30 days
  const incomeQuery =
    "SELECT SUM(amount * price) AS totalIncome FROM income WHERE date BETWEEN ? AND ?";
  db.query(incomeQuery, [startDate, endDate], (incomeErr, incomeResult) => {
    if (incomeErr) {
      return res
        .status(500)
        .json({ error: "An error occurred while calculating income" });
    }

    // Query to calculate the total expenses for the last 30 days
    const expenseQuery =
      "SELECT SUM(amount * price) AS totalExpenses FROM expense WHERE date BETWEEN ? AND ?";
    db.query(
      expenseQuery,
      [startDate, endDate],
      (expenseErr, expenseResult) => {
        if (expenseErr) {
          return res
            .status(500)
            .json({ error: "An error occurred while calculating expenses" });
        }

        const totalIncome = incomeResult[0].totalIncome || 0;
        const totalExpenses = expenseResult[0].totalExpenses || 0;
        const netEarnings = totalIncome - totalExpenses;

        return res.status(200).json([
          {
            totalIncome,
            totalExpenses,
            netEarnings,
          },
        ]);
      }
    );
  });
};

export const monthlyEarning = (req, res) => {
  const q = `SELECT
            DATE_FORMAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL (n - 1) MONTH), '%Y-%m-01'), '%Y-%m') AS month,
            COALESCE(SUM(price), 0) AS total_revenue FROM income
            RIGHT JOIN ( SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 ) AS months
            ON
            DATE_FORMAT(date, '%Y-%m') = DATE_FORMAT(DATE_SUB(NOW(), INTERVAL (n - 1) MONTH), '%Y-%m')
            WHERE
            date >= DATE_SUB(NOW(), INTERVAL 6 MONTH) OR date IS NULL GROUP BY month ORDER BY month `;

  db.query(q, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
};

export const featuredMonth = (req, res) => {
  const q = `SELECT
  SUM(CASE WHEN type = 'income' THEN price * amount ELSE 0 END) AS total_income,
  SUM(CASE WHEN type = 'expense' THEN price * amount ELSE 0 END) AS total_expense
FROM (
  SELECT 'income' AS type, price, amount
  FROM income
  WHERE MONTH(date) = MONTH(CURRENT_DATE()) AND YEAR(date) = YEAR(CURRENT_DATE())
  UNION ALL
  SELECT 'expense' AS type, price, amount
  FROM expense
  WHERE MONTH(date) = MONTH(CURRENT_DATE()) AND YEAR(date) = YEAR(CURRENT_DATE())
) AS combined_data;
`;

  db.query(q, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
};

export const mostRecentTransaction = (req, res) => {
  // const q = `SELECT * FROM (
  //     SELECT 'income' AS type, income_id AS product_id, amount, price, price * amount AS total_price, date, description
  //     FROM income
  //     ORDER BY total_price DESC
  //     LIMIT 5
  // ) AS top_income_expense
  // UNION ALL
  // SELECT * FROM (
  //     SELECT 'expense' AS type, expense_id AS product_id, amount, price, price * amount AS total_price, date, description
  //     FROM expense
  //     ORDER BY total_price DESC
  //     LIMIT 5
  // ) AS top_expense_income
  // ORDER BY total_price DESC
  // LIMIT 5;
  //   `;

  const q = `SELECT * FROM (
    SELECT 'income' AS type, income.income_id AS product_id, income.amount, income.price, income.price * income.amount AS total_price, income.date, income.description, products.product_name
    FROM income
    LEFT JOIN products ON income.product_id = products.product_id
    ORDER BY total_price DESC
    LIMIT 5
) AS top_income_expense

UNION ALL

SELECT * FROM (
    SELECT 'expense' AS type, expense.expense_id AS product_id, expense.amount, expense.price, expense.price * expense.amount AS total_price, expense.date, expense.description, expense.expense_name AS product_name
    FROM expense
    ORDER BY total_price DESC
    LIMIT 5
) AS top_expense_income

ORDER BY total_price DESC
LIMIT 5;

`;

  db.query(q, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
};
