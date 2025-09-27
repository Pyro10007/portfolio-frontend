import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const AdminLogin = ({ setIsAdmin }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsAdmin(true); // Set admin state in App.js
        alert('Login successful!');
        navigate('/'); // Redirect to home page
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <section className={`py-16 px-4 min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto text-center max-w-md">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Admin Login</h2>
        <form onSubmit={handleSubmit} className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-8 rounded-lg shadow-lg space-y-6`}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-md border focus:outline-none focus:border-pink-500 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 rounded-md border focus:outline-none focus:border-pink-500 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
          >
            Login
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
