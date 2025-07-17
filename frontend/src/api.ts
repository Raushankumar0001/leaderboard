import axios, { AxiosError } from 'axios';
import { User, LeaderboardEntry, ClaimResponse, ClaimHistoryEntry } from './types';

const API_BASE_URL = 'http://localhost:5001/api';

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || axiosError.message);
  }
  throw error;
};

export const api = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw handleError(error);
    }
  },

  // Add new user
  addUser: async (name: string): Promise<User> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, { name });
      return response.data;
    } catch (error) {
      console.error('Failed to add user:', error);
      throw handleError(error);
    }
  },

  // Claim points for a user
  claimPoints: async (userId: string): Promise<ClaimResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/claim`, { userId });
      return response.data;
    } catch (error) {
      console.error('Failed to claim points:', error);
      throw handleError(error);
    }
  },

  // Get leaderboard
  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/leaderboard`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      throw handleError(error);
    }
  },

  // Get claim history
  getClaimHistory: async (userId?: string): Promise<ClaimHistoryEntry[]> => {
    try {
      // If userId is undefined, get all history
      const url = userId 
        ? `${API_BASE_URL}/claim/history/${userId}`
        : `${API_BASE_URL}/claim/history`;
      console.log('Fetching claim history from:', url);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch claim history:', error);
      throw handleError(error);
    }
  }
}; 