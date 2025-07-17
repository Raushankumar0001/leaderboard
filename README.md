# Leaderboard Application

A full-stack application that lets users compete and track points on a real-time leaderboard.

## Features

- User Management

  - Add and select users
  - Track points for each user
  - Display user rankings

- Points System

  - Claim random points (1-10)
  - Automatic point calculation
  - Point history tracking

- Leaderboard
  - Real-time updates
  - Sorted by total points
  - Top 3 players highlighted
  - Responsive design

## Technology Stack

- Frontend

  - React with TypeScript
  - Modern CSS with Flexbox
  - Responsive design

- Backend

  - Node.js
  - Express
  - RESTful API

- Database
  - MongoDB
  - Mongoose ODM

## Setup Requirements

1. System Requirements

   - Node.js (version 14 or higher)
   - MongoDB (running locally)
   - npm package manager

2. Project Structure
   ```
   project/
   ├── backend/
   │   ├── models/
   │   │   ├── User.js
   │   │   └── ClaimHistory.js
   │   ├── routes/
   │   │   ├── users.js
   │   │   ├── claims.js
   │   │   └── leaderboard.js
   │   └── server.js
   └── frontend/
       ├── src/
       │   ├── components/
       │   ├── App.tsx
       │   └── App.css
       └── package.json
   ```

## Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone <repository-url>
   cd project
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. Database Setup:

   - Start MongoDB service
   - Default connection: mongodb://localhost:27017
   - Database name: leaderboard

3. Start the Application:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

## Using the Application

1. Adding Users

   - Click "Add New User" button
   - Enter user name
   - Click "Add" to save

2. Claiming Points

   - Select a user from the list
   - Click "Claim Points"
   - Random points (1-10) will be awarded
   - Points are automatically added to total

3. Viewing Rankings
   - Leaderboard shows all users
   - Sorted by highest points
   - Top 3 users highlighted
   - Updates automatically

## API Documentation

The backend provides these REST endpoints:

1. Users

   - GET /api/users - Get all users
   - POST /api/users - Add new user

   ```json
   Request: { "name": "User Name" }
   ```

2. Points

   - POST /api/claim - Award points

   ```json
   Request: { "userId": "user_id" }
   ```

3. Leaderboard
   - GET /api/leaderboard - Get rankings
   ```json
   Response: [
     {
       "rank": 1,
       "name": "User",
       "totalPoints": 100
     }
   ]
   ```

## Troubleshooting

1. MongoDB Issues

   - Check if service is running
   - Verify connection string
   - Check database permissions

2. Port Conflicts

   - Backend default: 5001
   - Frontend default: 3000
   - Ports can be changed in configuration

3. Common Solutions
   - Clear browser cache
   - Restart MongoDB service
   - Check console for errors
   - Verify all services are running

## Development Notes

- Frontend runs on http://localhost:3000
- Backend runs on http://localhost:5001
- MongoDB runs on default port 27017
- Auto-refresh enabled for real-time updates
- Responsive design works on all devices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions:

1. Check existing issues
2. Create detailed bug reports
3. Include steps to reproduce
4. Provide relevant error messages
