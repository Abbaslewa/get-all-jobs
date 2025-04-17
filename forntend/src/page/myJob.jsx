import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId'); // Make sure this is saved during login

        if (!token || !userId) {
          navigate('/login'); // Redirect if no token or user ID
          return;
        }

        const response = await fetch('/api/jobs', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();

        // 🧠 Filter jobs created by the current user
        const myJobs = data.filter((job) => job.createdBy === userId);

        setJobs(myJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]);

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
                </tr>
              </thead>
              <tbody className="bg-white/10 divide-y divide-white/20">
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td className="px-4 py-3">
                      <img
                        src={job.image || 'https://via.placeholder.com/50'}
                        alt={job.title}
                        className="w-10 h-10 rounded"
                      />
                    </td>
                    <td className="px-4 py-3">{job.title}</td>
                    <td className="px-4 py-3">{job.company}</td>
                    <td className="px-4 py-3">{job.location}</td>
                    <td className="px-4 py-3">{job.jobType}</td>
                    <td className="px-4 py-3">{job.salary}</td>
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
