// Example Salary component
import React from 'react';

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Salary Preferences</h3>
      <select
        onChange={handleChange}
        className="w-full bg-white/20 text-white py-2 px-4 rounded-xl mb-4"
      >
        <option value="">Select salary range</option>
        <option value="50000">&lt; 50,000K</option>
        <option value="80000">&lt; 80,000K</option>
        <option value="100000">&lt; 100,000K</option>
      </select>
      <button
        onClick={handleClick}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl"
      >
        Set Preference
      </button>
    </div>
  );
};

export default Salary;
