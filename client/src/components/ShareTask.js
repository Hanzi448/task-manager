import React, { useState } from 'react';
import api from '../services/api';

const ShareTask = ({ taskId }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleShare = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      await api.post('/tasks/shared/share', { taskId, email });
      setMessage(`Task shared with ${email}`);
      setEmail('');
    } catch (error) {
      setMessage('Failed to share task. Please check the email.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleShare} className="d-flex align-items-center gap-2 mt-2">
      <input
        type="email"
        className="form-control"
        placeholder="Share with email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-outline-info btn-sm">Share</button>
      {message && <small className="text-muted ms-2">{message}</small>}
    </form>
  );
};

export default ShareTask;