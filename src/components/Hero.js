import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import ImageModal from './ImageModal';

const Hero = ({ name, profession, missionStatement, imageUrl, isAdmin, updateProfileImage, onSave }) => { // Receive isAdmin, updateProfileImage, and onSave
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableName, setEditableName] = useState(name);
  const [editableProfession, setEditableProfession] = useState(profession);
  const [editableMissionStatement, setEditableMissionStatement] = useState(missionStatement);

  // Update local state when props change (e.g., after initial fetch or save)
  React.useEffect(() => {
    setEditableName(name);
    setEditableProfession(profession);
    setEditableMissionStatement(missionStatement);
  }, [name, profession, missionStatement]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    onSave({
      name: editableName,
      profession: editableProfession,
      missionStatement: editableMissionStatement,
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/owner-profile/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        updateProfileImage(data.profileImageUrl); // Update image URL in App.js state
        setIsModalOpen(false);
      } else {
        alert(`Error uploading image: ${data.message}`);
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      alert('Error uploading profile image.');
    }
  };

  const handleImageRemove = async () => {
    if (!window.confirm('Are you sure you want to remove the profile image?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/owner-profile/remove-image`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        updateProfileImage(data.profileImageUrl); // Update image URL in App.js state
        setIsModalOpen(false);
      } else {
        alert(`Error removing image: ${data.message}`);
      }
    } catch (error) {
      console.error('Error removing profile image:', error);
      alert('Error removing profile image.');
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-yellow-400 rotate-45"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-red-500 rotate-12"></div>
      <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-blue-500 rotate-90"></div>

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between z-10">
        {/* Left side content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
          >
            HI, I AM <span
              className="text-pink-500"
              contentEditable={isAdmin}
              onBlur={(e) => setEditableName(e.target.textContent)}
              suppressContentEditableWarning={true}
            >{editableName}</span>, A <span
              className="text-pink-500"
              contentEditable={isAdmin}
              onBlur={(e) => setEditableProfession(e.target.textContent)}
              suppressContentEditableWarning={true}
            >{editableProfession}</span>
          </h1>
          <p
            className={`text-lg md:text-xl mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
            contentEditable={isAdmin}
            onBlur={(e) => setEditableMissionStatement(e.target.textContent)}
            suppressContentEditableWarning={true}
          >
            {editableMissionStatement}
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="https://wa.me/yourphonenumber"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <FaWhatsapp className="mr-2" /> LET'S CHAT ON WHATSAPP
            </a>
            <a
              href="mailto:your-email@example.com"
              className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} font-bold py-3 px-6 rounded-full flex items-center justify-center transition-colors duration-300`}
            >
              OR SEND ME AN EMAIL
            </a>
          </div>
          {isAdmin && (
            <button
              onClick={handleSave}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* Right side image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Your Portrait"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full grayscale cursor-pointer"
              onClick={handleImageClick}
            />
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        imageUrl={imageUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isAdmin={isAdmin}
        onImageUpload={handleImageUpload}
        onImageRemove={handleImageRemove}
      />
    </section>
  );
};

export default Hero;
