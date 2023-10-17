import express from "express";
import multer from "multer";
import path from "path";

import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getDangerProducts,
  getDangerProductCount,
} from "../controllers/Product.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log("this is the file" + file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", getProducts);
router.get("/danger", getDangerProducts); // for notification
router.get("/count", getDangerProductCount); // for notification
router.get("/:id", getProduct);
router.post("/", upload.single("image"), addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
