import { cartService } from "../services/index.js";

export class CartClass {
  getCarts = async (req, res) => {
    const carts = cartService.getCarts();
    if (!carts)
      res
        .status(400)
        .send({ status: "error", error: "No Hay Carritos Activos" });
    return res.status(200).send(carts);
  };

  getCartById = async (req, res) => {
    const { cId } = req.params;
    const cart = cartService.getCartbyId(cId);
    if (!cart)
      res
        .status(400)
        .send({ status: "error", error: "Carrito invalido o inexistente" });
    return res.status(200).send(cart);
  }; //Get Cart

  getCartByUid = async (req, res) => {
    const uId = req.user._id;
    const cart = cartService.getCartbyUId(uId);
    if (!cart)
      res
        .status(400)
        .send({ status: "error", error: "Carrito invalido o inexistente" });
    return res.status(200).send(cart);
  };

  createCart = async (req, res) => {
    console.log(req.user);
    const uId = req.user._id;
    const { pId } = req.params;
    req.body = Object.assign({}, { uId }, { pId }, req.body);
    try {
      const cart = cartService.createCart(req.body);
      return cart;
    } catch (error) {
      return res
        .status(400)
        .send({ status: "error", error: "No se pudo crear carrito" });
    }
  };

  updateCart = async (req, res) => {
    const { cId, pId } = req.params;
    if (!cId || !pId) {
      return res
        .status(400)
        .send({ status: "error", error: "Faltan Parametos en la Solicitud" });
    }

    try {
      req.body = Object.assign({}, { cId }, { pId }, req.body);
      await cartService.updateCart(req.body);
      return res.status(200).send("Carrito Modificado");
    } catch (error) {
      return res
        .status(400)
        .send({ status: "error", error: "Faltan Parametos en la Solicitud" });
    }
  };

  deleteCart = async (req, res) => {
    const { cId } = req.params;
    try {
      await cartService.delCart(cId);
      return res.status(200).send("Carrito Eliminado");
    } catch (error) {
      return res.status(401).send({
        status: "error",
        error: `No se pudo eliminar Carrito ${error}`,
      });
    }
  };
  buyCart = async (req, res) => {
    const { cId } = req.params;
    await cartService.buyCart(cId);
  };
}

// export const CartClass = new CartClass();
