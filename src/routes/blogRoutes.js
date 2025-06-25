import express from 'express';
import upload from '../middleware/upload.js';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controller/blogController.js';

const router = express.Router();

router
  .route('/')
  .get(getAllBlogs)
  .post(upload.single('featuredImage'), createBlog);

router
  .route('/:id')
  .get(getBlogById)
  .put(upload.single('featuredImage'), updateBlog)
  .delete(deleteBlog);

export default router;
