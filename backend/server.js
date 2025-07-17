const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/leaderboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Import routes
const usersRoute = require('./routes/users');
const claimsRoute = require('./routes/claims');
const leaderboardRoute = require('./routes/leaderboard');

// Debug middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Register routes
app.use('/api/users', usersRoute);
app.use('/api/claim', claimsRoute);
app.use('/api/leaderboard', leaderboardRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Handle 404 routes
app.use((req, res) => {
    console.log('404 Not Found:', req.url);
    res.status(404).json({ message: `Route ${req.url} not found` });
});

// Try different ports if default is in use
const tryPort = (port) => {
    app.listen(port)
        .on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${port} is busy, trying ${port + 1}`);
                tryPort(port + 1);
            } else {
                console.error('Server error:', err);
            }
        })
        .on('listening', () => {
            console.log(`Server is running on port ${port}`);
        });
};

// Start server
tryPort(5001); 