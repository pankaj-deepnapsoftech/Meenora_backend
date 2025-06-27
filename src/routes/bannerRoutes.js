// src/routes/bannerRoutes.js
import express from 'express';
import upload from '../middleware/upload.js';
import {
  createBanner,
  getAllBanners,
  getBannersByPage,
  updateBanner,
  deleteBanner,
} from '../controller/BannerController.js';

const router = express.Router();

router.route('/').get(getAllBanners).post(upload.single('image'), createBanner);

router.route('/:page').get(getBannersByPage);

router
  .route('/:id')
  .put(upload.single('image'), updateBanner)
  .delete(deleteBanner);

export default router;
