import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import path from "path";
import cors from 'cors'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


app.use(
    cors({
        origin: 'https://ctinassl-smiski-showcase.onrender.com', // Allow requests only from your frontend domain
        credentials: true, 
    })
);

app.use(express.json()); // Allows to accept JSON data in the body
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});