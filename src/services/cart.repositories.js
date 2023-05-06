export class CartRepositories {
    constructor(cartDao) {
      this.cartDao = cartDao;
    }
    createCart = async (uId, pId) => {
      let { products, cartTotal } = cart;
      userId = !uId ? 1 : uId;
  
      return await cartDao.create({
        userId,
        products,
        cartTotal,
      });
    };
  
    updateCart = async (params) => {
      let { uId, cId, prodId, cartTotal, code, price, quantity } = params;
  
      uId = !uId ? 1 : uId;
      cartTotal = !cartTotal ? price : cartTotal;
      cId = !cId ? 1 : cId;
      quantity = !quantity ? 1 : quantity;
  
      if (!this.cartDao.cartExist(uId, cId)) {
        let products = [];
        let product = { prodId, code, quantity };
        products.push(product);
        const nWreg = Object.assign({}, { products }, params);
      } else {
        const objUpdate = {
          filter: { userId: uId, cartId: cId },
          query: {
            $inc: {
              "products.$[elm].quantity": quantity,
            },
          },
          options: {
            arrayFilters: [{ "elm.code": code }],
          },
        };
        const result = await this.CartDao.updateCart(objUpdate);
        if (result.modifiedCount > 0) {
          objUpdate.query = {
            $inc: {
              cartTotal: price * quantity,
            },
          };
          objUpdate.options = "";
          await this.CartDao.updateCart(objUpdate);
  
          // await CartDao.updateOne(
          //   { userId: uId, cartId: cId },
          //   {
          //     $inc: {
          //       cartTotal: price * quantity,
          //     },
          //   }
          // );
        } else {
          objUpdate.query = {
            $inc: {
              cartTotal: price * quantity,
            },
            $addToSet: {
              products: {
                prodId: prodId,
                code: code,
                quantity: quantity,
              },
            },
          };
          objUpdate.options = {
            arrayFilters: [{ "elm.code": code }],
          };
          await this.CartDao.updateCart(objUpdate);
          //     await CartDao.updateOne(
          //       { userId: uId, cartId: cId },
          //       {
          //         $inc: {
          //           cartTotal: price * quantity,
          //         },
          //         $addToSet: {
          //           products: {
          //             prodId: prodId,
          //             code: code,
          //             quantity: quantity,
          //           },
          //         },
          //       },
          //       {
          //         arrayFilters: [{ "elm.code": code }],
          //       }
          //     );
          //   }
        }
        return await this.CartDao.getCartById(cId).lean();
      }
    };
    buyCart = async (cId) => {
      const cart = this.cartDao.getCartById(cId);
      const nwCart = cart;
      this.updateCart(nwCart);
      const objUpdate = {
        filter: { cartId: cId },
        query: { purchased: true },
        options: "",
      };
      //generar ticket
      return await this.cartDao.updateCart(objUpdate);
    };
  }