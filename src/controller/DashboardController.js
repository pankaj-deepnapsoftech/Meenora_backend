import Blog from '../models/Blog.js';
import Contact from '../models/Contact.js';
import Product from '../models/Product.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';

export const DashboardCardData = AsyncHandler(async (req, res) => {
  const products = await Product.find().countDocuments();
  const Hair_care = await Product.find({
    category: 'Hair Care',
  }).countDocuments();
  const Skin_care = await Product.find({
    category: 'Skin Care',
  }).countDocuments();
  const Face_care = await Product.find({
    category: 'Face Care',
  }).countDocuments();
  const blog = await Blog.find().countDocuments();
  const ContactUS_Req = await Contact.find().countDocuments();

  return res.status(200).json({
    message: 'Dashboard Card data',
    data: {
      products,
      Hair_care,
      Skin_care,
      Face_care,
      ContactUS_Req,
      blog,
    },
  });
});
