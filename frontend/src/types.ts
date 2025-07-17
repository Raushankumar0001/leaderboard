export interface User {
  _id: string;
  name: string;
  totalPoints: number;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  totalPoints: number;
}

export interface ClaimResponse {
  user: User;
  points: number;
  claimHistory: {
    userId: string;
    points: number;
    timestamp: string;
  };
}

export interface ClaimHistoryEntry {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  points: number;
  timestamp: string;
} 