import Product from '../models/Product.js';
import { config } from '../config/env.config.js';
//   Create new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      status,
      ingredients,
      benefits,
      howToUse,
      concern,
      tags,
    } = req.body;

    const image = req.file
      ? `${config.NODE_ENV !== 'development' ? config.IMAGE_URL : config.LOCAL_IMAGE_URL}/${req.file.filename}`
      : null;

    const product = new Product({
      name,
      description,
      price,
      category,
      status,
      image,
      ingredients,
      benefits,
      howToUse,
      concern,
      tags,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//   Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ dateAdded: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//   Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//   Update product
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      status,
      ingredients,
      benefits,
      howToUse,
      concern,
      tags,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.status = status || product.status;
      product.ingredients = ingredients || product.ingredients;
      product.benefits = benefits || product.benefits;
      product.howToUse = howToUse || product.howToUse;
      product.concern = concern || product.concern;
      product.tags = tags || product.tags;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//    Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product Removed' });
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
