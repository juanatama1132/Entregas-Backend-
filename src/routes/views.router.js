import express from "express";
import PM from "../Dao/productManager.js";
const router = express.Router();
let prodList = [];
router.get("/", async (req, res) => {
  try {
    prodList = await PM.getProducts(req.query);
    res.render("home", { prodList, style: "home.css" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Faltan Datos sobre el Producto Transaccion Cancelada",
    });
  }
});
router.get("/chat", (req, res) => {
  const prodList = PM.getProducts(true);
  res.render("chat", { prodList, style: "chat.css" });
});

export default router;
