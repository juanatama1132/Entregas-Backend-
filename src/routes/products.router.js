import { Router } from "express";
import { ProductClass } from "../controlers/products.controler.js";
import { auth } from "../middleware/auth.js";
import { authToken } from "../utils/jsonwt.js";
const productClass = new ProductClass();
const router = Router();
router
  .get("/", productClass.getProducts)
  // .get("/:pId", productClass.getProductbyId);
  .get("/:pCode", authToken, productClass.getProductByCode)
  .get("/mockingproducts", authToken, productClass.getMockingProducts)
  .post("/", authToken, auth(["admin", "premium"]), productClass.createProduct)
  .put(
    "/:pId",
    authToken,
    auth(["admin", "premium"]),
    productClass.updateProduct
  )
  .delete(
    "/:pId",
    authToken,
    auth(["admin", "premium"]),
    productClass.deleteProduct
  );

export default router;
