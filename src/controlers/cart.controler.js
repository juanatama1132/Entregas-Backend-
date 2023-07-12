import { cartService } from "../services/index.js";

export class CartClass {
  getCarts = async (req, res) => {
    const carts = cartService.getCarts();
    if (!carts)
      res
        .status(400)
        .send({ status: "error", error: "No Hay Carritos Activos" });
    res.status(200).send({ status: "ok", payload: carts });
  };

  getCartById = async (req, res) => {
    const { cId } = req.params;
    const cart = cartService.getCartbyId(cId);
    if (!cart)
      res
        .status(400)
        .send({ status: "error", error: "Carrito invalido o inexistente" });
    res.status(200).send({ status: "ok", payload: cart });
  }; //Get Cart

  getCartByUid = async (req, res) => {
    const uId = req.user._id;
    const cart = cartService.getCartbyUId(uId);
    if (!cart)
      res
        .status(400)
        .send({ status: "error", error: "Carrito invalido o inexistente" });
    res.status(200).send({ status: "ok", payload: cart });
  };

  hasPermit = (pId, role, eMail) => {
    if (role !== "user") {
      const product = productService.getProductbyId(pId);
      if (!product || product.owner === eMail) return false;
    }
    return true;
  };

  createCart = async (req, res) => {
    // console.log(req.user);
    const uId = req.user._id;
    const { pId } = req.params;
    req.body = Object.assign({}, { uId }, { pId }, req.body);
    if (!this.hasPermit(pId, req.user.role, req.user.eMail))
      res.status(400).send({
        status: "error",
        error: "No puede Agregar este Producto al carrito",
      });
    try {
      const cart = cartService.createCart(req.body);
      res.status(200).send({ status: "ok", payload: cart });
    } catch (error) {
      res
        .status(400)
        .send({ status: "error", error: "No se pudo crear carrito" });
    }
  };

  updateCart = async (req, res) => {
    const { cId, pId } = req.params;
    if (!cId || !pId) {
      res
        .status(400)
        .send({ status: "error", error: "Faltan Parametos en la Solicitud" });
    }
    if (!this.hasPermit(pId, req.user.role, req.user.eMail))
      res.status(400).send({
        status: "error",
        error: "No puede Agregar este Producto al carrito",
      });

    try {
      req.body = Object.assign({}, { cId }, { pId }, req.body);
      await cartService.updateCart(req.body);
      res.status(200).send({ status: "ok", message: "Carrito Modificado" });
    } catch (error) {
      res
        .status(400)
        .send({ status: "error", error: "Faltan Parametos en la Solicitud" });
    }
  };

  deleteCart = async (req, res) => {
    const { cId } = req.params;
    try {
      await cartService.delCart(cId);
      res.status(200).send({ status: "ok", message: "Carrito Eliminado" });
    } catch (error) {
      res.status(401).send({
        status: "error",
        error: `No se pudo eliminar Carrito ${error}`,
      });
    }
  };

  buyCart = async (req, res) => {
    const { cId } = req.params;
    try {
      await cartService.buyCart(cId);
    } catch (error) {}
  };
}

// export const CartClass = new CartClass();