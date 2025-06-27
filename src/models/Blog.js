import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String, default: 'Admin' },
  category: { type: String },
  tags: [String],
  excerpt: { type: String },
  content: { type: String },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  featuredImage: { type: String },
  dateAdded: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
