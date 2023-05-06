export class ProductRepositories {
    constructor(productsDao) {
      this.productsDao = productsDao;
    }
    addProduct = async (product) => {
      return await this.productsDao.addProduct(product);
    };
    getProducts = async (params) => {
      let { limit, page, query, sort } = params;
      // console.log(params);
      limit = !limit ? 10 : limit;
      page = !page ? 1 : page;
      (query = !query ? "status:true" : "status:true," + query),
        (sort = !sort ? "" : sort);
      const objQuery = {
        filter: { query },
        options: { limit: limit, page: page, sort: { sort }, lean: true },
      };
      try {
        return await this.productsDao.getProducts(objQuery);
      } catch (error) {
        console.log(error);
        return [];
      }
    };
  
    getProductById = async (pId) => await this.productsDao.getProductById(pId);
    getProductByCode = async (pCode) =>
      await this.productsDao.getProductByCode(pCode);
  
    modProduct = async (params) => {
      const { pId, description, stock } = params;
      const objQuery = {
        filter: { _id: pId },
        query: { description, stock, status: true },
        options: {},
      };
      try {
        await this.productsDao.updateProduct(objQuery);
      } catch (error) {
        console.log(error);
      }
    };
    delProduct = async (pId) => await this.productsDao.delProduct(pId);
  }