import express from 'express';
import {
  getUserCart,
  addToCart,
  removeFromCart,
  clearCart,
} from '../controller/CartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getUserCart);
router.post('/', authMiddleware, addToCart);
router.delete('/:productId', authMiddleware, removeFromCart);
router.delete('/', authMiddleware, clearCart);

export default router;
