import { Router } from "express";
import { CartClass } from "../controlers/cart.controler.js";
const cartClass = new CartClass();
import { auth } from "../middleware/auth.js";
import { authToken } from "../utils/jsonwt.js";
const router = Router();
router
  .get("/", authToken, cartClass.getCarts)
  .get("/:cId", authToken, cartClass.getCartById)
  .put(":cId/purchase", authToken, cartClass.buyCart)
  .post(
    "/products/:pId",
    authToken,
    auth(["user", "premium"]),
    cartClass.createCart
  )
  .put(
    "/:cId/products/:pId",
    authToken,
    auth(["user", "premium"]),
    cartClass.updateCart
  )
  .delete("/:cId", authToken, auth(["user", "premium"]), cartClass.deleteCart);

export default router;