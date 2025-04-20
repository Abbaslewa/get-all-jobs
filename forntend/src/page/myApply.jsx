import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, Mail, Phone, MapPin, User } from 'lucide-react';

const MyApply = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/applications');
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load applications');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] via-[#928DAB] to-[#1f1c2c] px-4 py-12 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 drop-shadow-md">My Job Applications</h1>
        <p className="text-base text-gray-200 mb-8">A summary of all the positions you've applied for.</p>

        {loading ? (
          <p className="text-purple-200 text-lg animate-pulse">🔄 Fetching your applications...</p>
        ) : error ? (
          <p className="text-red-400 text-lg">{error}</p>
        ) : applications.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-lg hover:scale-[1.02] transition duration-300"
              >
                <div className="flex items-center gap-2 mb-2 text-lg font-medium text-purple-100">
                  <User className="w-4 h-4 text-purple-400" /> {app.fullName}
                </div>
                <div className="text-gray-300 text-sm flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-gray-400" /> Job ID: {app.jobId}
                </div>
                <div className="text-gray-300 text-sm flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-gray-400" /> {app.email}
                </div>
                <div className="text-gray-300 text-sm flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-gray-400" /> {app.phoneNumber}
                </div>
                <div className="text-gray-300 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" /> {app.city}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-white">🧐 No applications found yet.</p>
        )}

        <button
          onClick={handleGoBack}
          className="mt-10 inline-block px-6 py-2 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-white font-semibold rounded-full shadow-md hover:shadow-lg"
        >
          ⬅️ Back to Home
        </button>
      </div>
    </div>
  );
};

export default MyApply;
