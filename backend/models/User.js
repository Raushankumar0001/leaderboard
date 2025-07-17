const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        unique: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot be longer than 50 characters']
    },
    totalPoints: {
        type: Number,
        default: 0,
        min: [0, 'Total points cannot be negative']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


userSchema.index({ totalPoints: -1, name: 1 });

module.exports = mongoose.model('User', userSchema); 