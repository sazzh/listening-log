import express from 'express';
import path from 'path';
import 'dotenv/config';
import errorHandler from './errorHandler.js';
import artistRoutes from './routes/artistRoutes.js';

const app = express();
const PORT = process.env.PORT || 8325;

// Setup Middleware
app.use(express.static(path.join(import.meta.dirname, 'public'))); // serve static files from 'public' directory
app.use(express.json()); // recognise request body as JSON
app.use(express.urlencoded({ extended: true })); // recognise request body as strings or arrays
app.set('view engine', 'ejs'); // set EJS as templating engine

// Setup Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/api/artists', artistRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});