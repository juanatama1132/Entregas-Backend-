import { generateMockProducts } from "../mocking/products.mock.js";
import { productService } from "../services/index.js";

export class ProductClass {
  getProducts = async (req, res) => {
    try {
      const prodList = await productService.getProducts(req.query);
      res.render("products", { prodList, style: "products.css" });
    } catch (error) {
      console.log(error);
    }
  }; //Get all Products

  getProductbyId = async (req, res) => {
    const { pId } = req.params;
    try {
      const product = productService.getProductById(pId);
      if (!product) res.status(400).send("Producto invalido o inexistente");
      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(400).send("Producto invalido o inexistente");
    }
  }; //Get Product Info
  getProductByCode = async (req, res) => {
    const { pCode } = req.params;
    try {
      const product = productService.getProductByCode(pCode);
      console.log(product);
      if (!product) res.status(400).send("Producto invalido o inexistente");
      res.status(201).send(product);
    } catch (error) {
      console.log(error);
      res.status(400).send("Producto invalido o inexistente");
    }
  };
  createProduct = async (req, res) => {
    const { description, code, price, category } = req.body;
    if (!description || !code || !price || !category)
      res.status(400).send({
        message: "Faltan Datos sobre el Producto, Transaccion Cancelada",
      });

    // console.log("Post");
    try {
      await productService.addProduct(req.body);
      res.status(201).send({ message: "Producto Agregado Exitosamente" });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error al agregar Producto, Transaccion Cancelada",
      });
    }
  }; //Add New Product

  updateProduct = async (req, res) => {
    const { pId } = req.params;
    const { code, description, stock } = req.body;
    if (!code || !description || !stock) {
      res.status(400).send({
        message: `Faltan enviar datos del Producto ${
          !product.code ? " Codigo" : ""
        } ${!product.description ? " Descripcion del Producto" : ""}${
          !product.stock ? " Stock Disponible" : ""
        }`,
      });
      req.body = Object.assign({}, { pId }, req.body);
      try {
        await productService.modProduct(req.body);
        res.status(200).send({ message: "Producto Actualizado Correctamente" });
      } catch (error) {
        res
          .status(400)
          .send({ message: "Error al Actualizar, Transaccion Cancelada" });
      }
    }
  }; //Modify Product Data (Detail, Stock, Price)

  deleteProduct = async (req, res) => {
    const { pId } = req.params;
    try {
      await productService.delProduct(pId);
      return res
        .status(200)
        .send({ message: "Producto Marcado para Eliminar" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "No se Pudo Eliminar Producto" });
    }
  };
  getMockingProducts = async (req, res) => {
    // console.log("Generando Mocks------");
    let mockProducts = [];
    try {
      for (let i = 0; i < 100; i++) {
        // console.log(`item ${i}`, mockProducts);
        mockProducts.push(generateMockProducts());
      }

      return res.status(200).send(mockProducts);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ message: "No se Pudo generar Productos Mock" });
    }
  };
}

//export default ProductClass;
