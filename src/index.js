import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.use('/file', express.static(path.join(__dirname, '../', 'public/temp')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
