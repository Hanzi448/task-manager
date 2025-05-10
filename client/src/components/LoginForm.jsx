import React, { useState } from 'react';
import { loginUser } from '../services/authService';

const LoginForm = ({ onLoginSuccess, onAuthSwitch }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser(formData);
      localStorage.setItem('token', token);
      onLoginSuccess(user);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <form 
      onSubmit={handleSubmit} 
      className="p-5 shadow rounded bg-white w-100" 
      style={{ maxWidth: '450px' }}
    >
      <h2 className="text-center mb-4">Login</h2>

      <div className="mb-3">
        <input 
          name="email" 
          placeholder="Email" 
          type="email" 
          className="form-control" 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="mb-3">
        <input 
          name="password" 
          placeholder="Password" 
          type="password" 
          className="form-control" 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="d-grid mb-3">
        <button type="submit" className="btn btn-primary btn-lg">Login</button>
      </div>

      <p className="text-center mb-0">
        Don't have an account?{' '}
        <span 
          onClick={() => onAuthSwitch('register')} 
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Register
        </span>
      </p>
    </form>
  </div>
  );
};

export default LoginForm;
