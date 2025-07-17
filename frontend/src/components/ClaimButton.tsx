import React, { useState } from 'react';
import { api } from '../api';

interface ClaimButtonProps {
  userId: string | null;
  onPointsClaimed: () => void;
}

export const ClaimButton: React.FC<ClaimButtonProps> = ({ userId, onPointsClaimed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastClaim, setLastClaim] = useState<{ points: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClaim = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await api.claimPoints(userId);
      if (response) {
        setLastClaim({ points: response.points });
        onPointsClaimed();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to claim points');
      console.error('Error claiming points:', error);
    } finally {
      setIsLoading(false);
      // Clear last claim after 3 seconds
      setTimeout(() => setLastClaim(null), 3000);
    }
  };

  return (
    <div className="claim-points-container">
      <button
        onClick={handleClaim}
        disabled={!userId || isLoading}
        className="claim-button"
      >
        {isLoading ? 'Claiming...' : 'Claim Points'}
      </button>

      {error && <div className="error-message">{error}</div>}
      
      {lastClaim && (
        <div className="success-message">
          🎉 Claimed {lastClaim.points} points!
        </div>
      )}

      {!userId && (
        <div className="info-message">
          Select a user to claim points
        </div>
      )}
    </div>
  );
}; 