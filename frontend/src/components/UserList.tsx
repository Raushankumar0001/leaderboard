import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../api';

interface UserListProps {
  onUserSelect: (userId: string) => void;
  selectedUserId: string | null;
}

export const UserList: React.FC<UserListProps> = ({ onUserSelect, selectedUserId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setError(null);
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load users');
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newUserName.trim();
    
    if (!trimmedName) {
      setError('Please enter a user name');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const newUser = await api.addUser(trimmedName);
      setUsers(prevUsers => [...prevUsers, newUser]);
      setNewUserName('');
      setIsAddingUser(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-list">
      <h2>Users</h2>

      <div className="users-container">
        {users.length === 0 ? (
          <div className="empty-message">No users yet. Add some users to get started!</div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className={`user-item ${selectedUserId === user._id ? 'selected' : ''}`}
              onClick={() => onUserSelect(user._id)}
            >
              <span className="user-name">{user.name}</span>
              <span className="user-points">{user.totalPoints} points</span>
            </div>
          ))
        )}
      </div>

      {isAddingUser ? (
        <form onSubmit={handleAddUser} className="add-user-form">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => {
              setNewUserName(e.target.value);
              setError(null);
            }}
            placeholder="Enter user name"
            className="user-input"
            disabled={isLoading}
            minLength={2}
            maxLength={50}
            autoFocus
          />
          <div className="form-buttons">
            <button 
              type="submit" 
              className="add-button"
              disabled={isLoading || !newUserName.trim()}
            >
              {isLoading ? 'Adding...' : 'Add'}
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => {
                setIsAddingUser(false);
                setNewUserName('');
                setError(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button 
          className="new-user-button"
          onClick={() => setIsAddingUser(true)}
        >
          + Add New User
        </button>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}; 