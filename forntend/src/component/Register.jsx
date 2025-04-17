import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate(); // hook for redirection
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log('Registration successful:', response.data);

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorMessage('This email is already registered. Please log in instead.');
      } else if (error.response?.status === 400) {
        setErrorMessage('Please fill all required fields correctly.');
      } else {
        setErrorMessage('Registration failed. Please try again later.');
      }

      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f0036] via-[#4b006e] to-[#1f0036] flex items-center justify-center p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6 text-white">
        <h2 className="text-3xl font-bold text-center">Register Now</h2>

        {errorMessage && (
          <p className="text-center text-sm text-red-500">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-300" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-300" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-300" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-xl transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-purple-200">
          Already registered?{' '}
          <a href="/login" className="text-purple-400 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
