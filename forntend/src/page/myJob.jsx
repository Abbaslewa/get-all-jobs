import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const getToken = () => localStorage.getItem('token');

const MyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    const token = getToken();
    if (!token) return navigate('/login');

    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        localStorage.clear();
        navigate('/login');
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchJobs();
    localStorage.removeItem('newJobCreated');
  }, [fetchJobs]);

  const handleEdit = (jobId) => navigate(`/edit-job/${jobId}`);

  const handleDelete = async (jobId) => {
    const token = getToken();
    if (!token) return navigate('/login');

    const confirmed = window.confirm('Are you sure you want to delete this job?');
    if (!confirmed) return;

    try {
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete job');

      fetchJobs();
    } catch (err) {
      setError(err.message);
      fetchJobs();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">My Posted Jobs</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all"
          >
            Go Back Home
          </button>
        </div>

        {loading ? (
          <p className="text-white text-center mt-10">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center mt-10">{error}</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job._id} className="bg-white/20 p-4 rounded-xl text-white shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p>{job.company} - {job.location}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(job._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
