import { config } from '../config/env.config.js';
import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
  try {
    const { title, slug, author, category, tags, excerpt, content, status } =
      req.body;

    const featuredImage = req.file
      ? `${config.NODE_ENV !== 'development' ? config.IMAGE_URL : config.LOCAL_IMAGE_URL}/${req.file.filename}`
      : null;

    const blog = new Blog({
      title,
      slug,
      author,
      category,
      tags: Array.isArray(tags) ? tags : JSON.parse(tags || '[]'),
      excerpt,
      content,
      status,
      featuredImage,
    });

    const created = await blog.save();
    res.status(201).json({ message: 'Blog post created', blog: created });
  } catch (error) {
    console.error('Create Blog Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const currentPage = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (currentPage - 1) * pageSize;

    const blogs = await Blog.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);

    res.json(blogs);
  } catch (error) {
    console.error('Fetch Blogs Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) res.json(blog);
    else res.status(404).json({ message: 'Blog not found' });
  } catch (error) {
    console.error('Get Blog Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const { title, slug, author, category, tags, excerpt, content, status } =
      req.body;

    blog.title = title || blog.title;
    blog.slug = slug || blog.slug;
    blog.author = author || blog.author;
    blog.category = category || blog.category;
    blog.tags = tags ? JSON.parse(tags) : blog.tags;
    blog.excerpt = excerpt || blog.excerpt;
    blog.content = content || blog.content;
    blog.status = status || blog.status;

    if (req.file) {
      const imagePath = `${
        config.NODE_ENV !== 'development'
          ? config.IMAGE_URL
          : config.LOCAL_IMAGE_URL
      }/${req.file.filename}`;
      blog.featuredImage = imagePath;
    }

    const updated = await blog.save();
    res.json({ message: 'Blog updated', blog: updated });
  } catch (error) {
    console.error('Update Blog Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    await Blog.deleteOne({ _id: req.params.id });
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    console.error('Delete Blog Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
