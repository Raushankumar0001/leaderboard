import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { api } from '../api';

interface LeaderboardProps {
  refreshTrigger: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ refreshTrigger }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, [refreshTrigger]);

  const loadLeaderboard = async () => {
    try {
      const data = await api.getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
  };

  const getRowClassName = (rank: number) => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return 'bronze';
    return '';
  };

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <div>Rank</div>
          <div>Name</div>
          <div>Points</div>
        </div>
        {leaderboard.map((entry) => (
          <div
            key={entry.id}
            className={`leaderboard-row ${getRowClassName(entry.rank)}`}
          >
            <div>{entry.rank}</div>
            <div>{entry.name}</div>
            <div>{entry.totalPoints}</div>
          </div>
        ))}
      </div>
    </div>
  );
}; 