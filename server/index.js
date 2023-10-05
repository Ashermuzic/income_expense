import express from "express";
import cookieParser from "cookie-parser";
import incomeCategory from "./routes/incomeCategory.js";
import expenseCategory from "./routes/expenseCategory.js";
import product from "./routes/product.js";
import income from "./routes/income.js";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8800;

const app = express();

app.use(express.json());
app.use(cookieParser());

// Define CORS options
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Serve images from the "public/images" directory
app.use("/images", express.static("public/images"));

app.use("/categories", incomeCategory);
app.use("/expenseCategories", expenseCategory);
app.use("/products", product);
app.use("/incomes", income);

app.listen(8800, () => {
  console.log("Connected!");
  console.log(`Listening on port ${port}`);
});
