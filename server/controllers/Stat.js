import { query } from "express";
import { db } from "../db.js";
import moment from "moment";

// export const getNetEarningsLast30Days = (req, res) => {
//   // Calculate the date 30 days ago from today
//   const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
//   const endDate = moment().format("YYYY-MM-DD");

//   // Query to calculate the total income for the last 30 days
//   const incomeQuery =
//     "SELECT SUM(amount) AS totalIncome FROM income WHERE date BETWEEN ? AND ?";
//   db.query(incomeQuery, [startDate, endDate], (incomeErr, incomeResult) => {
//     if (incomeErr) {
//       return res
//         .status(500)
//         .json({ error: "An error occurred while calculating income" });
//     }

//     // Query to calculate the total expenses for the last 30 days
//     const expenseQuery =
//       "SELECT SUM(amount) AS totalExpenses FROM expense WHERE date BETWEEN ? AND ?";
//     db.query(
//       expenseQuery,
//       [startDate, endDate],
//       (expenseErr, expenseResult) => {
//         if (expenseErr) {
//           return res
//             .status(500)
//             .json({ error: "An error occurred while calculating expenses" });
//         }

//         const totalIncome = incomeResult[0].totalIncome || 0;
//         const totalExpenses = expenseResult[0].totalExpenses || 0;
//         const netEarnings = totalIncome - totalExpenses;

//         return res.status(200).json({
//           totalIncome,
//           totalExpenses,
//           netEarnings,
//         });
//       }
//     );
//   });
// };

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
