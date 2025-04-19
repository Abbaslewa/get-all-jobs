import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Apply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fullName') setFullName(value);
    if (name === 'email') setEmail(value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!fullName || !email || !file) {
      setMessage('Please fill in all fields and attach your resume.');
      return;
    }
  
    setLoading(true);
    setMessage('');
  
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('jobId', jobId);
    formData.append('resume', file);
  
    // Log the formData before sending it
    console.log(formData);
  
    try {
      const response = await axios.post('http://localhost:5000/api/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setMessage('Application submitted successfully!');
      console.log(response.data);
      setTimeout(() => navigate('/myapply'), 2000); // redirect to applications page
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
      <div className="bg-white/10 p-10 rounded-2xl shadow-lg w-[90%] max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Apply for Job #{jobId}</h1>
        <p className="text-purple-200 mb-6">Please complete the application process here.</p>

        {message && (
          <div className="mb-4 text-yellow-300 font-medium">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleInputChange}
            placeholder="Your Full Name"
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 py-2 rounded-xl font-semibold text-white disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        <button
          onClick={handleGoBack}
          className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Apply;
