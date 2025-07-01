const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const verificationRoutes = require('./routes/verification.routes'); 
const outpassRoutes = require('./routes/outpass.routes'); 

dotenv.config(); // Load .env vars

const connectDB = require('./config/db');
const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // for parsing form data

// Routes placeholder
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/outpass', outpassRoutes);

// Export app
module.exports = app;
