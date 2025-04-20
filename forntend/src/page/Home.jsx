import React, { useState } from 'react';
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Salary from './Salary';
import image from '../assets/image.jpeg';
import images from '../assets/images.jpeg';
import just from '../assets/just.webp';
import devops from '../assets/devops.png';
import googleImg from '../assets/google.png';
import webImg from '../assets/webdev.jpeg';

const Home = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const jobs = [
    { title: 'Front-End Developer', company: 'TechFlow Inc.', location: 'Rwanda Kigali', type: 'Full-Time', salary: '< 50,000K', img: image },
    { title: 'UI/UX Designer', company: 'DesignLab', location: 'Rwanda Mahama', type: 'Part-Time', salary: '< 80,000K', img: images },
    { title: 'Backend Developer (Node.js)', company: 'CodeWorks', location: 'Kigali, Rwanda', type: 'Contract', salary: '< 100,000K', img: just },
    { title: 'Software Engineer', company: 'Google', location: 'Mahama', type: 'Full-Time', salary: '> 150,000K', img: googleImg },
    { title: 'Web Developer', company: 'Freelance', location: 'Rwanda', type: 'Freelance', salary: '< 70,000K', img: webImg },
    { title: 'DevOps Engineer', company: 'AWS', location: 'Kigali, Rwanda', type: 'Full-Time', salary: '> 130,000K', img: devops },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filtered = jobs.filter((job) =>
      job.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredJobs(filtered);
    setSubmitted(true);
  };

  const jobsToDisplay = submitted ? filteredJobs : jobs;

  const handleApplyNowClick = () => {
    navigate('/apply/:jobId');
  };

  const handleMyJobClick = () => {
    navigate('/my-jobs');
  };

  const handleCreateJobClick = () => {
    navigate('/create-job');
  };

  const handleMyApplyClick = () => {
    navigate('/myapply'); // Navigate to MyApply page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white px-4 py-10">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-12">
  <div className="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="30"
      viewBox="0 0 29 30"
      fill="none"
      className="text-purple-600"
    >
      <circle cx="12.0143" cy="12.5143" r="12.0143" fill="currentColor" fillOpacity="0.4" />
      <circle cx="16.9857" cy="17.4857" r="12.0143" fill="currentColor" />
    </svg>
    <h1 className="text-3xl font-semibold text-white ml-4">JobPortal</h1>
  </div>
  <div className="flex items-center space-x-6">
    <button className="flex items-center text-white" onClick={handleMyJobClick}>My Jobs</button>
    <button className="flex items-center text-white" onClick={handleCreateJobClick}>Create Job</button>
    <button className="flex items-center text-white" onClick={handleMyApplyClick}>My Apply</button>
    <span className="text-white font-semibold">It&apos;s me</span>
    <button className="flex items-center text-white" onClick={() => navigate('/profile')}>
      <FaUserCircle className="mr-2" /> Profile
    </button>
    <button className="flex items-center text-white" onClick={handleLogout}>
      <FaSignOutAlt className="mr-2" /> Logout
    </button>
  </div>
</nav>

      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-lg text-purple-200">Search for jobs, internships, or freelance gigs across different industries.</p>
      </header>

      {/* Search Section */}
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 mb-10">
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSearchSubmit}>
          <div className="relative">
            <FaBriefcase className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled
            />
          </div>
          <div className="relative">
            <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Enter location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-all duration-300 w-full"
          >
            <FaSearch className="inline mr-2" /> Search
          </button>
        </form>
      </div>

      {/* Salary Section */}
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6 mb-10">
        <Salary />
      </div>

      {/* Job Listings */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Latest Jobs</h2>
        {submitted && filteredJobs.length === 0 && (
          <p className="text-center text-purple-200 mb-6">No jobs found for that location.</p>
        )}
        <div className="flex flex-wrap justify-between gap-6">
          {jobsToDisplay.map((job, idx) => (
            <div
              key={idx}
              className="w-full md:w-[48%] lg:w-[30%] bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 flex flex-col gap-4"
            >
              <img src={job.img} alt={`${job.title} logo`} className="w-full h-40 object-cover rounded-lg" />
              <div>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-purple-200">{job.company}</p>
                <p className="text-sm text-gray-300">{job.location}</p>
                <p className="text-sm text-gray-400">{job.type}</p>
                <p className="text-sm text-gray-400">{job.salary}</p>
              </div>
              <button
                onClick={handleApplyNowClick}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-all duration-300"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
