import { db } from "../db.js";

export const getCategories = (req, res) => {
  const q = "SELECT * FROM income_categories";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};
