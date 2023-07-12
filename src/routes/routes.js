import { Router } from "express";
import uploader from "../utils/multerConfig.js";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";

const router = Router();
// router.use("/", viewsRouter);
router
  .use("/", authRouter)
  .use("/api/user", userRouter)
  .use("/api/products", productsRouter)
  .use("/api/cart", cartsRouter);

export default router;
// module.exports = router;