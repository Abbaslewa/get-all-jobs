import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Utility function to get token from localStorage
const getToken = () => localStorage.getItem('token');

const MyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs with the useCallback hook to avoid unnecessary re-fetching
  const fetchJobs = useCallback(async () => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }

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
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchJobs();
    localStorage.removeItem('newJobCreated');
  }, [fetchJobs]);

  // Redirect to the edit page for a job
  const handleEdit = (jobId) => navigate(`/edit-job/${jobId}`);

  // Delete job with optimistic UI update
  const handleDelete = async (jobId) => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this job?');
    if (!confirmed) return;

    try {
      // Optimistically remove the job from the state
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete job');

      // Fetch jobs again to update the job list
      fetchJobs();
    } catch (err) {
      setError(err.message || 'Failed to delete job');
      fetchJobs(); // Revert optimistic deletion
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
          <p className="text-white text-center mt-10">Error: {error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-white text-center mt-10">You haven’t created any jobs yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-white/30 rounded-lg overflow-hidden">
              <thead className="bg-purple-700 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Salary</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white/10 divide-y divide-white/20">
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td className="px-4 py-3">
                      <img
                        src={job.image || 'https://via.placeholder.com/50'}
                        alt={job.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/50';
                        }}
                        className="w-10 h-10 rounded"
                      />
                    </td>
                    <td className="px-4 py-3">{job.title}</td>
                    <td className="px-4 py-3">{job.company}</td>
                    <td className="px-4 py-3">{job.location}</td>
                    <td className="px-4 py-3">{job.jobType}</td>
                    <td className="px-4 py-3">
                      ${Number(job.salary).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleEdit(job._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
