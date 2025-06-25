import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controller/productController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/').get(getProducts).post(upload.single('image'), createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(upload.single('image'), updateProduct)
  .delete(deleteProduct);

export default router;
