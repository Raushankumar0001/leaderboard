const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get leaderboard (users sorted by points)
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
            .sort('-totalPoints')
            .select('name totalPoints');

        // Add rank to each user
        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            totalPoints: user.totalPoints,
            id: user._id
        }));

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 