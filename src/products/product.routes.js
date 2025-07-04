import express from 'express';
import ProductController from './product.controller.js';
const ProductRouter = express.Router();

const productcontroller = new ProductController();

ProductRouter.get('/', productcontroller.getProduct);

export default ProductRouter;