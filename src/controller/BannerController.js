// src/controller/BannerController.js
import { config } from '../config/env.config.js';
import Banner from '../models/Banner.js';

export const createBanner = async (req, res) => {
  try {
    const { heading, description, page, status } = req.body;

    const image = req.file
      ? `${config.NODE_ENV !== 'development' ? config.IMAGE_URL : config.LOCAL_IMAGE_URL}/${req.file.filename}`
      : null;

    const banner = new Banner({ heading, description, page, status, image });

    const created = await banner.save();
    res.status(201).json({ message: 'Banner created', data: created });
  } catch (err) {
    console.error('Create Banner Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllBanners = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const currentPage = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (currentPage - 1) * pageSize;

    const banners = await Banner.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);

    res.json({ message: 'Banners data', data: banners });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getBannersByPage = async (req, res) => {
  try {
    const { page } = req.params;
    const banners = await Banner.find({ page, status: 'active' });
    res.json({ data: banners });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    const { heading, description, page, status } = req.body;

    banner.heading = heading || banner.heading;
    banner.description = description || banner.description;
    banner.page = page || banner.page;
    banner.status = status || banner.status;

    if (req.file) {
      const img = `${config.NODE_ENV !== 'development' ? config.IMAGE_URL : config.LOCAL_IMAGE_URL}/${req.file.filename}`;
      banner.image = img;
    }

    const updated = await banner.save();
    res.json({ message: 'Banner updated', data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    await Banner.deleteOne({ _id: req.params.id });
    res.json({ message: 'Banner deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
