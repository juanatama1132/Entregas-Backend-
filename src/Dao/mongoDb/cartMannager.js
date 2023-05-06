import CartModel from "./mongoDb/models/cart.model.js";
export class CartMannager {
  constructor() {}
  createCart = async (cart) => await CartModel.create(cart);

  updateCart = async (objUpdate) => {
    const { filter, query, options } = objUpdate;
    return await CartModel.updateOne(filter, query, options);
  };

  deleteCart = async (cId) => {
    return await CartModel.deleteOne({ _id: cId });
  };

  getCarts = async () => await CartModel.find({}).lean();

  getCartbyId = async (cId) => await CartModel.find({ _id: cId }).lean();

  getCartbyUid = async (cId) => await CartModel.find({ UserId: uId }).lean();

  cartExists = async (uId, cId) =>
    await CartModel.exists({ userId: uId, cartId: cId });
}
// const CartManager = new CartMannager();
// export default CartManager;
