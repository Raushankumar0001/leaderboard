const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort('-totalPoints');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// Add new user
router.post('/', async (req, res) => {
    try {
        console.log('Received request to add user:', req.body);
        const { name } = req.body;

        // Validate input
        if (!name || typeof name !== 'string' || !name.trim()) {
            console.log('Invalid user name:', name);
            return res.status(400).json({
                message: 'Valid user name is required',
                received: name
            });
        }

        const trimmedName = name.trim();

        // Check if user already exists
        const existingUser = await User.findOne({ name: trimmedName });
        if (existingUser) {
            console.log('User already exists:', trimmedName);
            return res.status(400).json({
                message: 'User with this name already exists',
                name: trimmedName
            });
        }

        // Create new user
        const user = new User({
            name: trimmedName,
            totalPoints: 0
        });

        console.log('Creating new user:', user);
        const newUser = await user.save();
        console.log('User created successfully:', newUser);

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Failed to create user',
            error: error.message
        });
    }
});

module.exports = router; 