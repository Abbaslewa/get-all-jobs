import React, { useLocation } from 'react';

const ApplyPage = () => {
  const location = useLocation(); // Use useLocation to get the passed job data
  const { job } = location.state || {}; // Get job details from location state

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white px-4 py-10">
      <h1 className="text-3xl font-semibold mb-4">Apply for Job</h1>
      {job ? (
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
          <p className="text-purple-200">{job.company}</p>
          <p className="text-sm text-purple-300">{job.location}</p>
          <p className="text-sm text-purple-300">Salary: {job.salary}</p>
          <div className="mt-4">
            <button className="bg-purple-600 hover:bg-purple-700 py-2 px-6 rounded-xl text-white">
              Submit Application
            </button>
          </div>
        </div>
      ) : (
        <p>No job details available.</p>
      )}
    </div>
  );
};

export default ApplyPage;
