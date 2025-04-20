import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  // Dummy user data, can be replaced with actual data
  const user = {
    name: 'Abbas Lewa',
    email: 'abbaslewa24$$@gmail.com',
    location: 'Rwanda',
    role: 'Front-End Developer',
    bio: 'Passionate about building sleek, fast, and modern UIs using React and TailwindCSS.',
    profileImage: 'https://via.placeholder.com/150', // You can add a real image here
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-black/40 p-8 rounded-2xl shadow-xl border border-purple-600 backdrop-blur-lg">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-purple-600"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-purple-300 text-sm">{user.role}</p>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-purple-400">Email</h2>
            <p className="text-white">{user.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-purple-400">Location</h2>
            <p className="text-white">{user.location}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-purple-400">Bio</h2>
            <p className="text-white">{user.bio}</p>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleBackHome}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
