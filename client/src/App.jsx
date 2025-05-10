import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskManager from './components/TaskManager';
import SharedTasks from './components/SharedTasks';
import Dashboard from './components/Dashboard';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { email: 'LoggedInUser' } : null;
  });
  const [authPage, setAuthPage] = useState('login');
  const [view, setView] = useState('myTasks');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    socket.on('notification', (data) => {
      toast.info(data.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : '';
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
  <div className="container mt-4">
    <ToastContainer />
    {!user ? (
      authPage === 'login' ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} onAuthSwitch={setAuthPage} />
      ) : (
        <RegisterForm onAuthSwitch={setAuthPage} />
      )
    ) : (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-primary text-left w-100">Task Management System</h2>
          <div className="top-right-controls d-flex align-items-center gap-3 position-absolute end-0 me-3">
            <div className="form-check form-switch d-flex align-items-center gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="darkModeToggle"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <label className="form-check-label" htmlFor="darkModeToggle">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </label>
            </div>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="mb-3 d-flex gap-2">
          <button
            className={`btn ${view === 'myTasks' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('myTasks')}
          >
            My Tasks
          </button>
          <button
            className={`btn ${view === 'sharedTasks' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('sharedTasks')}
          >
            Shared With Me
          </button>
          <button
            className={`btn ${view === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('dashboard')}
          >
            Dashboard
          </button>
        </div>

        {view === 'myTasks' ? (
          <TaskManager key="myTasks" onLogout={handleLogout} />
        ) : view === 'sharedTasks' ? (
          <SharedTasks key="sharedTasks" />
        ) : (
          <Dashboard key="dashboard" />
        )}
      </>
    )}
  </div>
);
}

export default App;
