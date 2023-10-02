import express from "express";
import cookieParser from "cookie-parser";
import category from "./routes/category.js";
import product from "./routes/product.js";
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
  origin: "http://localhost:3000", // Replace with the actual frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, headers) to be included in the request
  optionsSuccessStatus: 204, // Set the status code for successful preflight requests
};

// Use the cors middleware with the defined options
app.use(cors(corsOptions));

app.use("/categories", category);
app.use("/products", product);

app.listen(8800, () => {
  console.log("Connected!");
  console.log(`Listening on port ${port}`);
});
