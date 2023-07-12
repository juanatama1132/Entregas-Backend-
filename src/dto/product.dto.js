export class productDTO {
    nwProduct = (product) => {
      return {
        title: product.title,
        description: product.description || "No Description",
        code: product.code,
        price: product.price || 0,
        status: true,
        stock: product.stock || 0,
        category: product.category || "not categorized yet",
        owner: product.user || "admin",
        thumbnails: product.thumbnails || [],
      };
    };
    //   modProduct = (product, data) => {
    //     let {
    //       title,
    //       description,
    //       price,
    //       stock,
    //       status,
    //       category,
    //       owner,
    //       thumbnails,
    //     } = product;
    //     if (data.title && data.title !== title) title = data.title;
    //     if (data.quantity) {
    //       stock += data.quantity;
    //     } else if (data.stock && stock !== data.stock) {
    //       stock = data.stock;
    //     }
    //     if (data.price && price !== data.price) price = data.price;
    //     if (data.status && data.status !== status) status = data.status;
    //     if (data.category && data.cartgory !== category) category = data.category;
    //     if (data.owner && data.owner !== owner) owner = data.owner;
    //     if (data.thumbnails && data.thumbnails.lenght !== thumbnails.lenght)
    //       thumbnails = data.thumbnails;
  
    //     return {
    //       title,
    //       description,
    //       price,
    //       status,
    //       stock,
    //       category,
    //       owner,
    //       thumbnails,
    //     };
    //   };
  }