import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Apply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGoBack = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
      <div className="bg-white/10 p-10 rounded-2xl shadow-lg w-[90%] max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Apply for Job #{jobId}</h1>
        <p className="text-purple-200 mb-6">Please complete the application process here.</p>
        <form className="flex flex-col gap-4 text-left">
          <input
            type="text"
            placeholder="Your Full Name"
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Why should we hire you?"
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 py-2 rounded-xl font-semibold text-white"
          >
            Submit Application
          </button>
        </form>
        {/* Go Back Home Button */}
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
