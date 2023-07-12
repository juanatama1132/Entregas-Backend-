export class cartDTO {
    nwCart = (user) => {
      return {
        userId: user._id,
        eMail: user.eMail,
        products: [],
        cartTotal: 0,
        purchased: false,
      };
    };
  
    // modCart = (cart, data) => {
    //   const productList = cart.products;
    //   let total = cart.cartTotal;
    //   const { prodId, quantity, price } = data;
    //   const index = productList.findindex((prod) => prod.prodId === prodId);
    //   product = productList[index];
    //   product.quantity += quantity;
    //   if ((product.quantity = 0)) {
    //     productList.splice(index, 1);
    //   } else {
    //     productList[index] = product;
    //   }
    //   total += quantity * price;
  
    //   return {
    //     userId: cart.userId,
    //     eMail: cart.eMail,
    //     products: productList,
    //     cartTotal: total,
    //     purchased: data.purchased,
    //   };
    // };
  }