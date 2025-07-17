const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Get all claim history
router.get('/history', async (req, res) => {
    try {
        const history = await ClaimHistory.find()
            .populate('userId', 'name')
            .sort('-timestamp')
            .limit(50);
        res.json(history);
    } catch (error) {
        console.error('Error fetching claim history:', error);
        res.status(500).json({ message: 'Failed to fetch claim history' });
    }
});

// Get claim history for specific user
router.get('/history/:userId', async (req, res) => {
    try {
        const history = await ClaimHistory.find({ userId: req.params.userId })
            .populate('userId', 'name')
            .sort('-timestamp');
        res.json(history);
    } catch (error) {
        console.error('Error fetching user claim history:', error);
        res.status(500).json({ message: 'Failed to fetch user claim history' });
    }
});

// Claim points for a user
router.post('/', async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const points = Math.floor(Math.random() * 10) + 1; // Random points between 1-10

        // Update user's total points
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.totalPoints += points;
        await user.save();

        // Create claim history entry
        const claimHistory = new ClaimHistory({
            userId,
            points,
            timestamp: new Date()
        });
        await claimHistory.save();

        // Return populated claim history
        const populatedClaim = await ClaimHistory.findById(claimHistory._id)
            .populate('userId', 'name');

        res.json({
            user,
            points,
            claimHistory: populatedClaim
        });
    } catch (error) {
        console.error('Error claiming points:', error);
        res.status(500).json({ message: 'Failed to claim points' });
    }
});

module.exports = router; 