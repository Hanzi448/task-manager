import React, { useState } from 'react';
import { registerUser } from '../services/authService';

const RegisterForm = ({ onAuthSwitch }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registered successfully. Please log in.');
      onAuthSwitch('login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <form 
      onSubmit={handleSubmit} 
      className="p-5 shadow rounded bg-white w-100" 
      style={{ maxWidth: '450px' }}
    >
      <h2 className="text-center mb-4">Register</h2>

      <div className="mb-3">
        <input 
          name="name" 
          placeholder="Name" 
          className="form-control" 
          onChange={handleChange} 
          required 
        />
      </div>

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

      <div className="mb-4">
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
        <button type="submit" className="btn btn-success btn-lg">Register</button>
      </div>

      <p className="text-center mb-0">
        Already have an account?{' '}
        <span 
          onClick={() => onAuthSwitch('login')} 
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Login
        </span>
      </p>
    </form>
  </div>
  );
};

export default RegisterForm;
