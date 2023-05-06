import { UserDao, ProductDao, CartDao } from "../Dao/factory.js";
// const { ProductModel } = require("../Dao/mongo/models/product.model.js");

import { ProductRepositories } from "./products.repositories.js";
import { UserRepositories } from "./user.repositories.js";
import { CartRepositories } from "./cart.repositories.js";

const userService = new UserRepositories(new UserDao());
const productService = new ProductRepositories(new ProductDao());
const cartService = new CartRepositories(new CartDao());

export { userService, productService, cartService };