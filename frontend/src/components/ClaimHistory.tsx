import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { ClaimHistoryEntry } from '../types';

interface ClaimHistoryProps {
  userId?: string | null;  // Updated to accept null
  refreshTrigger?: number;
}

export const ClaimHistory: React.FC<ClaimHistoryProps> = ({ userId, refreshTrigger = 0 }) => {
  const [history, setHistory] = useState<ClaimHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, [userId, refreshTrigger]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      // Only fetch history for non-null userId
      const data = await api.getClaimHistory(userId || undefined);
      setHistory(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load claim history');
      console.error('Error loading claim history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="claim-history">
        <h2>Claim History {userId ? 'for Selected User' : ''}</h2>
        <div className="loading-message">Loading history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="claim-history">
        <h2>Claim History {userId ? 'for Selected User' : ''}</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="claim-history">
      <h2>
        Claim History {userId ? 'for Selected User' : ''}
        <span className="history-count">({history.length} claims)</span>
      </h2>
      
      <div className="history-list">
        {history.length === 0 ? (
          <div className="empty-message">
            {userId 
              ? 'No points claimed yet. Click the Claim Points button to get started!'
              : 'No claims yet. Select a user and claim some points!'}
          </div>
        ) : (
          history.map((entry) => (
            <div key={entry._id} className="history-item">
              <div className="history-user">{entry.userId.name}</div>
              <div className="history-points">+{entry.points} points</div>
              <div className="history-time">
                {new Date(entry.timestamp).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 