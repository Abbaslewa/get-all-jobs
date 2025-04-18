import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    salary: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);

  // Fetch the job data if editing an existing job
  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            return navigate('/login');
          }

          const response = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setJob(response.data); // Set job data for editing
        } catch (error) {
          console.error('Error fetching job:', error.response || error.message);
        }
      };

      fetchJob();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const sanitizedSalary = job.salary.replace(/[^\d.-]/g, '');
    if (!sanitizedSalary || isNaN(sanitizedSalary)) {
      return alert('Please enter a valid numeric salary.');
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('You must be logged in to create or edit a job.');
    }
  
    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded?.userId;
      if (!userId) throw new Error('User ID not found in token.');
    } catch (error) {
      console.error('Token error:', error);
      return alert('Invalid token. Please log in again.');
    }
  
    setLoading(true);
  
    try {
      const response = id
        ? await axios.put(
            `http://localhost:5000/api/jobs/${id}`,
            {
              ...job,
              salary: sanitizedSalary,
              userId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        : await axios.post(
            'http://localhost:5000/api/jobs/create',
            {
              ...job,
              salary: sanitizedSalary,
              userId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

      if (response.status === 200 || response.status === 201) {
        console.log('Job saved:', response.data);
        navigate('/'); // Redirect to homepage after success
      }
    } catch (error) {
      console.error('Error saving job:', error.response || error.message);
      alert(error.response?.data?.message || 'There was an error saving the job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 px-4 py-10">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {id ? 'Edit Job' : 'Create a New Job'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          {[
            { name: 'title', placeholder: 'Job Title' },
            { name: 'company', placeholder: 'Company Name' },
            { name: 'location', placeholder: 'Location' },
            { name: 'salary', placeholder: 'Salary (e.g. 80000)' },
            { name: 'image', placeholder: 'Image URL (optional)', required: false },
          ].map(({ name, placeholder, required = true }) => (
            <input
              key={name}
              type="text"
              name={name}
              value={job[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              className="bg-white/20 text-white placeholder-purple-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ))}

          <select
            name="jobType"
            value={job.jobType}
            onChange={handleChange}
            required
            className="bg-white/20 text-white placeholder-purple-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Freelance">Freelance</option>
            <option value="Contract">Contract</option>
          </select>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Saving Job...' : id ? 'Save Changes' : 'Post Job'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-transparent border border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white font-medium py-2 px-6 rounded-xl transition-all duration-300"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
