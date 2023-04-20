const { UserDao, ProductDao, CartDao } = require("../Dao/factory.js");
// const { ProductModel } = require("../Dao/mongo/models/product.model.js");

const ProductRepositories = require("./product.respositories.js");
const UserRepositories = require("./user.respositories.js");
const CartRepositories = require("./cart.repositories.js");

const userService = new UserRepositories(new UserDao());
const productService = new ProductRepositories(new ProductDao());
const cartService = new CartRepositories(new CartDao());

export { userService, productService, cartService };