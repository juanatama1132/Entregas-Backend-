import { cartService } from "../repositories";

class CartClass {
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
    // const cart = Carts.find((item) => item.id === parseInt(cId));
    const cart = cartService.getCartbyId(cId);
    if (!cart)
      res
        .status(400)
        .send({ status: "error", error: "Carrito invalido o inexistente" });
    return res.status(200).send(cart);
  }; //Get Cart
  createCart = async (req, res) => {};
  updateCart = async (req, res) => {
    const { cId, pId } = req.params;

    if (!cId || !pId) {
      return res
        .status(400)
        .send({ status: "error", error: "Faltan Parametos en la Solicitud" });
    }

    try {
      req.body = Object.assign({}, { cId }, { pId }, req.body);
      await cartService.modCart(req.body);
      return res.status(200).send("Carrito Modificado");
    } catch (error) {
      return res
        .status(400)
        .send({ status: "error", error: "Faltan Parametos en la Solicitud" });
      //   console.log(error);
    }
  };
}
deleteCart = async (req, res) => {
  const { cId } = req.params;
  try {
    await cartService.delCart(req.body);
    return res.status(200).send("Carrito Eliminado");
  } catch (error) {
    return res
      .status(401)
      .send({ status: "error", error: `No se pudo eliminar Carrito ${error}` });
  }
};
export const CartClass = new CartClass();