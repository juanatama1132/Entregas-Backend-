import { Router } from "express";
import uploader from "../utils/multerConfig.js";
// import viewsRouter from "./views.router.js";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";

const router = Router();
// router.use("/", viewsRouter);
router.use("/", authRouter);
router.use("/api/user", userRouter);
router.use("/api/products", productsRouter);
router.use("/api/cart", cartsRouter);

export default router;
// module.exports = router;