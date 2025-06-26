import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { DashboardCardData } from './controller/DashboardController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/dashboard', DashboardCardData);

app.use('/file', express.static(path.join(__dirname, '../', 'public/temp')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
