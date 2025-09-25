import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const About = ({ aboutMeParagraph1, aboutMeParagraph2, isAdmin, onSave }) => {
  const { theme } = useTheme();
  const [editableAboutMeParagraph1, setEditableAboutMeParagraph1] = useState(aboutMeParagraph1);
  const [editableAboutMeParagraph2, setEditableAboutMeParagraph2] = useState(aboutMeParagraph2);

  useEffect(() => {
    setEditableAboutMeParagraph1(aboutMeParagraph1);
    setEditableAboutMeParagraph2(aboutMeParagraph2);
  }, [aboutMeParagraph1, aboutMeParagraph2]);

  const handleSave = () => {
    onSave({
      aboutMeParagraph1: editableAboutMeParagraph1,
      aboutMeParagraph2: editableAboutMeParagraph2,
    });
  };

  return (
    <section id="about" className={`py-16 px-4 min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
        <p
          className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          contentEditable={isAdmin}
          onBlur={(e) => setEditableAboutMeParagraph1(e.target.textContent)}
          suppressContentEditableWarning={true}
        >
          {editableAboutMeParagraph1}
        </p>
        <p
          className={`text-lg md:text-xl max-w-3xl mx-auto mt-4 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          contentEditable={isAdmin}
          onBlur={(e) => setEditableAboutMeParagraph2(e.target.textContent)}
          suppressContentEditableWarning={true}
        >
          {editableAboutMeParagraph2}
        </p>
        {isAdmin && (
          <button
            onClick={handleSave}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            Save Changes
          </button>
        )}
      </div>
    </section>
  );
};

export default About;
