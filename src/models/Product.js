import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  status: {
    type: String,
    enum: ['inStock', 'featured', 'comingSoon', ''],
    default: 'inStock',
  },
  image: [{ type: String }],
  ingredients: [String],
  benefits: [String],
  howToUse: { type: String },
  concern: { type: String },
  tags: [String],
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
