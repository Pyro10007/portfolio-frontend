import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { FaUserShield } from 'react-icons/fa';
import ImageModal from './ImageModal';

const Navbar = ({ isAdmin, setIsAdmin, profileImageUrl, updateProfileImage }) => {
  const { theme } = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    // Check for token on initial load to set isAdmin state
    const token = localStorage.getItem('token');
    if (token) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [setIsAdmin]);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    setIsDropdownOpen(false);
    console.log(`Language changed to: ${lang}`);
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      // If already admin, log out
      localStorage.removeItem('token');
      setIsAdmin(false);
      alert('Logged out of Admin Mode');
      navigate('/'); // Redirect to home after logout
    } else {
      // If not admin, redirect to login page
      navigate('/admin/login');
    }
  };

  const handleProfileImageClick = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <nav className={`p-4 flex justify-between items-center fixed w-full z-10 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-800 shadow-md'}`}>
      <div className="flex items-center">
        <img 
          src={profileImageUrl} 
          alt="Owner Profile" 
          className="h-10 w-10 rounded-full mr-2 cursor-pointer object-cover" 
          onClick={handleProfileImageClick}
        />
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-pink-500 transition-colors duration-300">HOME</Link>
        <Link to="/recent-work" className="hover:text-pink-500 transition-colors duration-300">RECENT WORK</Link>
        <Link to="/contact" className="hover:text-pink-500 transition-colors duration-300">CONTACT</Link>
        
        {/* Language Switch Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center hover:text-pink-500 transition-colors duration-300 focus:outline-none"
          >
            {currentLanguage} <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {isDropdownOpen && (
            <div className={`absolute right-0 mt-2 w-24 rounded-md shadow-lg block ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <button
                onClick={() => handleLanguageChange('EN')}
                className={`block w-full text-left px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'}`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('ES')}
                className={`block w-full text-left px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'}`}
              >
                ES
              </button>
              <button
                onClick={() => handleLanguageChange('HI')}
                className={`block w-full text-left px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'}`}
              >
                HI
              </button>
            </div>
          )}
        </div>
        
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Admin Mode Toggle */}
        <button
          onClick={handleAdminToggle}
          className={`p-2 rounded-full transition-colors duration-300 focus:outline-none ${isAdmin ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
          aria-label="Toggle Admin Mode"
          title={isAdmin ? 'Deactivate Admin Mode' : 'Activate Admin Mode'}
        >
          <FaUserShield className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Image Modal for Navbar */}
      <ImageModal
        imageUrl={profileImageUrl}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        isAdmin={isAdmin}
        onImageUpload={updateProfileImage} // Pass updateProfileImage directly
        onImageRemove={updateProfileImage} // Pass updateProfileImage directly
      />
    </nav>
  );
};

export default Navbar;
