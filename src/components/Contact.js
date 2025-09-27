import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa'; // Import icons

const Contact = ({ contactEmail, contactPhone, contactLinkedIn, isAdmin, onSave }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const [editableContactEmail, setEditableContactEmail] = useState(contactEmail);
  const [editableContactPhone, setEditableContactPhone] = useState(contactPhone);
  const [editableContactLinkedIn, setEditableContactLinkedIn] = useState(contactLinkedIn);

  useEffect(() => {
    setEditableContactEmail(contactEmail);
    setEditableContactPhone(contactPhone);
    setEditableContactLinkedIn(contactLinkedIn);
  }, [contactEmail, contactPhone, contactLinkedIn]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave({
      contactEmail: editableContactEmail,
      contactPhone: editableContactPhone,
      contactLinkedIn: editableContactLinkedIn,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      // Replace with your actual backend API endpoint
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(`Error: ${data.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('Error: Could not connect to the server.');
    }
  };

  return (
    <section id="contact" className={`py-16 px-4 min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Contact Me</h2>
        <p className={`text-lg md:text-xl mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          I'm always open to new opportunities and collaborations. Feel free to reach out through the form below or connect with me directly:
        </p>
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-lg shadow-lg flex flex-col items-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <FaEnvelope className="text-pink-500 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <span
              contentEditable={isAdmin}
              onBlur={(e) => setEditableContactEmail(e.target.textContent)}
              suppressContentEditableWarning={true}
              className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} hover:text-pink-500 transition-colors duration-300`}
            >
              {editableContactEmail}
            </span>
          </div>
          <div className={`p-6 rounded-lg shadow-lg flex flex-col items-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <FaPhone className="text-pink-500 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <span
              contentEditable={isAdmin}
              onBlur={(e) => setEditableContactPhone(e.target.textContent)}
              suppressContentEditableWarning={true}
              className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} hover:text-pink-500 transition-colors duration-300`}
            >
              {editableContactPhone}
            </span>
          </div>
          <div className={`p-6 rounded-lg shadow-lg flex flex-col items-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <FaLinkedin className="text-pink-500 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
            <span
              contentEditable={isAdmin}
              onBlur={(e) => setEditableContactLinkedIn(e.target.textContent)}
              suppressContentEditableWarning={true}
              className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} hover:text-pink-500 transition-colors duration-300`}
            >
              {editableContactLinkedIn}
            </span>
          </div>
        </div>
        {isAdmin && (
          <button
            onClick={handleSave}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            Save Changes
          </button>
        )}
        <form onSubmit={handleSubmit} className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-8 rounded-lg shadow-lg space-y-6 mt-8`}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-md border focus:outline-none focus:border-pink-500 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-md border focus:outline-none focus:border-pink-500 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 rounded-md border focus:outline-none focus:border-pink-500 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
          >
            Send Message
          </button>
          {status && (
            <p className={`mt-4 text-lg ${status.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
