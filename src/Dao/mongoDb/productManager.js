import ProductModel from "./models/product.model.js";
export class ProductMannager {
  constructor() {
    this.products = [];
  }
  getProducts = async (objQuery) => {
    // console.log(objQuery);
    const { filter, options } = objQuery;
    // try {
    return await ProductModel.paginate(
      filter,
      options
      // { query },
      // { limit: limit, page: page, sort: { sort }, lean: true }
    );
    // return res;
    // } catch (error) {
    //   console.log(error);
    //   return [];
    // }
  };

  getProductById = async (pId) => {
    return await ProductModel.find({ _id: pId }).lean();
  };

  getProductByCode = async (pCode) => {
    await ProductModel.find({ code: pCode }).lean();
  };

  addProduct = async (product) => {
    // const { title, description, code, price, stock, category, thumbnails } =
    //   params;
    return await ProductModel.create({ product });
  };

  updateProduct = async (updObject) => {
    // (id, code, description, stock)
    const { filter, query, options, session } = updObject;

    return await ProductModel.updateOne(
      // { _id: id },
      // { description, stock, status: true }
      filter,
      query,
      options,
      session
    );
  };

  delProduct = async (pId) => {
    return await ProductModel.updateOne({ _id: pId }, { status: false });
  };
}

// const PM = new ProductMannager();
// export default PM;