import express from 'express';
import path from 'path';
import 'dotenv/config';
import artistRoutes from './routes/artistRoutes.js';
import songRoutes from './routes/songRoutes.js';
import albumRoutes from './routes/albumRoutes.js';
import authRoutes from './routes/authRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import errorHandler from './Utils/errorHandler.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8325;

// Setup Middleware
app.use(express.static(path.join(import.meta.dirname, 'public'))); // serve static files from 'public' directory
app.use(express.json()); // recognise request body as JSON
app.use(express.urlencoded({ extended: true })); // recognise request body as strings or arrays
app.use(cookieParser()); // parse cookies
app.set('view engine', 'ejs'); // set EJS as templating engine

// Setup Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/api/artists', artistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});