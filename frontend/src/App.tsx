import React, { useState } from 'react';
import { UserList } from './components/UserList';
import { ClaimButton } from './components/ClaimButton';
import { Leaderboard } from './components/Leaderboard';
import { ClaimHistory } from './components/ClaimHistory';
import './App.css';

function App() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePointsClaimed = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app">
      <h1>Leaderboard App</h1>
      
      <div className="main-content">
        <div className="left-panel">
          <UserList
            selectedUserId={selectedUserId}
            onUserSelect={setSelectedUserId}
          />
          {selectedUserId && (
            <div className="claim-section">
              <h3>Selected User Actions</h3>
              <ClaimButton
                userId={selectedUserId}
                onPointsClaimed={handlePointsClaimed}
              />
            </div>
          )}
          <ClaimHistory 
            userId={selectedUserId}
            refreshTrigger={refreshTrigger}
          />
        </div>
        
        <div className="right-panel">
          <Leaderboard refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}

export default App; 