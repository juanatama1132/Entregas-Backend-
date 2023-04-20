import CartManager from './mongoDb/cartMannager.js'
import {persistence, dbConnection} from ('../config/config.js')

let ProductDao
let UserDao
let CartDao

switch (persistence) {
    case 'MONGO':
        dbConnection()
        const ProductMannager = require('./mongoDb/productManager.js')
        ProductDao = ProductMannager

        const UserMannager = require('./mongoDb/userMannager.js')
        UserDao = UserMannager

        const CartMannager =require('./mongoDb/cartMannager.js')
        CartDao=CartMannager

        break;
    case 'MEMORY':

        // const UserDaoMemory = require('./memory/user.memory.js')
        // UserDao = UserDaoMemory

        break;
    case 'FILESYSTEM':
        
        break;

    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao,
    CartDao
}