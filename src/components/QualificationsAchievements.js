import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const QualificationsAchievements = ({
  qualifications, experiences, achievements, certifications,
  isAdmin,
  onAddQualification, onUpdateQualification, onDeleteQualification,
  onAddExperience, onUpdateExperience, onDeleteExperience,
  onAddAchievement, onUpdateAchievement, onDeleteAchievement,
  onAddCertification, onUpdateCertification, onDeleteCertification,
}) => {
  const { theme } = useTheme();

  // State for editing existing items
  const [editingQualificationId, setEditingQualificationId] = useState(null);
  const [editableQualification, setEditableQualification] = useState({});
  const [editingExperienceId, setEditingExperienceId] = useState(null);
  const [editableExperience, setEditableExperience] = useState({});
  const [editingAchievementId, setEditingAchievementId] = useState(null);
  const [editableAchievement, setEditableAchievement] = useState({});
  const [editingCertificationId, setEditingCertificationId] = useState(null);
  const [editableCertification, setEditableCertification] = useState({});

  // State for new items
  const [newQualification, setNewQualification] = useState({ degree: '', institution: '', year: '', description: '' });
  const [newExperience, setNewExperience] = useState({ title: '', company: '', duration: '', description: '' });
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '', date: '', proofLink: '' });
  const [newCertification, setNewCertification] = useState({ title: '', issuer: '', date: '', link: '' });

  // Handlers for Qualifications
  const handleEditQualificationClick = (qa) => {
    setEditingQualificationId(qa._id);
    setEditableQualification({ ...qa });
  };

  const handleCancelQualificationEdit = () => {
    setEditingQualificationId(null);
    setEditableQualification({});
  };

  const handleSaveQualificationEdit = () => {
    onUpdateQualification(editingQualificationId, editableQualification);
    setEditingQualificationId(null);
    setEditableQualification({});
  };

  const handleDeleteQualificationClick = (id) => {
    onDeleteQualification(id);
  };

  const handleNewQualificationChange = (e) => {
    const { name, value } = e.target;
    setNewQualification(prev => ({ ...prev, [name]: value }));
  };

  const handleAddQualificationClick = () => {
    onAddQualification(newQualification);
    setNewQualification({ degree: '', institution: '', year: '', description: '' });
  };

  // Handlers for Experiences
  const handleEditExperienceClick = (exp) => {
    setEditingExperienceId(exp._id);
    setEditableExperience({ ...exp, description: exp.description.join(', ') }); // Convert array to string
  };

  const handleCancelExperienceEdit = () => {
    setEditingExperienceId(null);
    setEditableExperience({});
  };

  const handleSaveExperienceEdit = () => {
    const updatedExperience = {
      ...editableExperience,
      description: editableExperience.description.split(',').map(item => item.trim()).filter(item => item !== ''),
    };
    onUpdateExperience(editingExperienceId, updatedExperience);
    setEditingExperienceId(null);
    setEditableExperience({});
  };

  const handleDeleteExperienceClick = (id) => {
    onDeleteExperience(id);
  };

  const handleNewExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExperienceClick = () => {
    const experienceToAdd = {
      ...newExperience,
      description: newExperience.description.split(',').map(item => item.trim()).filter(item => item !== ''),
    };
    onAddExperience(experienceToAdd);
    setNewExperience({ title: '', company: '', duration: '', description: '' });
  };

  // Handlers for Achievements
  const handleEditAchievementClick = (ach) => {
    setEditingAchievementId(ach._id);
    setEditableAchievement({ ...ach });
  };

  const handleCancelAchievementEdit = () => {
    setEditingAchievementId(null);
    setEditableAchievement({});
  };

  const handleSaveAchievementEdit = () => {
    onUpdateAchievement(editingAchievementId, editableAchievement);
    setEditingAchievementId(null);
    setEditableAchievement({});
  };

  const handleDeleteAchievementClick = (id) => {
    onDeleteAchievement(id);
  };

  const handleNewAchievementChange = (e) => {
    const { name, value } = e.target;
    setNewAchievement(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAchievementClick = () => {
    onAddAchievement(newAchievement);
    setNewAchievement({ title: '', description: '', date: '', proofLink: '' });
  };

  // Handlers for Certifications
  const handleEditCertificationClick = (cert) => {
    setEditingCertificationId(cert._id);
    setEditableCertification({ ...cert });
  };

  const handleCancelCertificationEdit = () => {
    setEditingCertificationId(null);
    setEditableCertification({});
  };

  const handleSaveCertificationEdit = () => {
    onUpdateCertification(editingCertificationId, editableCertification);
    setEditingCertificationId(null);
    setEditableCertification({});
  };

  const handleDeleteCertificationClick = (id) => {
    onDeleteCertification(id);
  };

  const handleNewCertificationChange = (e) => {
    const { name, value } = e.target;
    setNewCertification(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCertificationClick = () => {
    onAddCertification(newCertification);
    setNewCertification({ title: '', issuer: '', date: '', link: '' });
  };

  return (
    <section id="qualifications-achievements" className={`py-16 px-4 min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Education, Experience & More</h2>

        {/* Education Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-pink-500 mb-8">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {qualifications.map((qa) => (
              <div key={qa._id} className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6 rounded-lg shadow-lg text-left ${isAdmin ? 'py-2' : ''}`}>
                {isAdmin && editingQualificationId === qa._id ? (
                  <div className="flex flex-col w-full space-y-2">
                    <input
                      type="text"
                      name="degree"
                      value={editableQualification.degree}
                      onChange={(e) => setEditableQualification(prev => ({ ...prev, degree: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Degree"
                    />
                    <input
                      type="text"
                      name="institution"
                      value={editableQualification.institution}
                      onChange={(e) => setEditableQualification(prev => ({ ...prev, institution: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Institution"
                    />
                    <input
                      type="text"
                      name="year"
                      value={editableQualification.year}
                      onChange={(e) => setEditableQualification(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Year"
                    />
                    <textarea
                      name="description"
                      value={editableQualification.description}
                      onChange={(e) => setEditableQualification(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white h-24"
                      placeholder="Description"
                    ></textarea>
                    <div className="flex space-x-2 mt-2">
                      <button onClick={handleSaveQualificationEdit} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Save</button>
                      <button onClick={handleCancelQualificationEdit} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="text-xl font-bold mb-2">{qa.degree}</h4>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>{qa.institution} - {qa.year}</p>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{qa.description}</p>
                    {isAdmin && (
                      <div className="flex space-x-2 mt-4">
                        <button onClick={() => handleEditQualificationClick(qa)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                        <button onClick={() => handleDeleteQualificationClick(qa._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          {isAdmin && (
            <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6 rounded-lg shadow-lg mt-8 max-w-md mx-auto`}>
              <h3 className="text-2xl font-bold text-pink-500 mb-4">Add New Qualification</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  name="degree"
                  placeholder="Degree"
                  value={newQualification.degree}
                  onChange={handleNewQualificationChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="institution"
                  placeholder="Institution"
                  value={newQualification.institution}
                  onChange={handleNewQualificationChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  value={newQualification.year}
                  onChange={handleNewQualificationChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newQualification.description}
                  onChange={handleNewQualificationChange}
                  className="w-full p-2 rounded bg-gray-700 text-white h-24"
                ></textarea>
                <button onClick={handleAddQualificationClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                  Add Qualification
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-pink-500 mb-8">Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp) => (
              <div key={exp._id} className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6 rounded-lg shadow-lg text-left ${isAdmin ? 'py-2' : ''}`}>
                {isAdmin && editingExperienceId === exp._id ? (
                  <div className="flex flex-col w-full space-y-2">
                    <input
                      type="text"
                      name="title"
                      value={editableExperience.title}
                      onChange={(e) => setEditableExperience(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Job Title"
                    />
                    <input
                      type="text"
                      name="company"
                      value={editableExperience.company}
                      onChange={(e) => setEditableExperience(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      name="duration"
                      value={editableExperience.duration}
                      onChange={(e) => setEditableExperience(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Duration"
                    />
                    <textarea
                      name="description"
                      value={editableExperience.description}
                      onChange={(e) => setEditableExperience(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white h-24"
                      placeholder="Description (comma-separated list of responsibilities)"
                    ></textarea>
                    <div className="flex space-x-2 mt-2">
                      <button onClick={handleSaveExperienceEdit} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Save</button>
                      <button onClick={handleCancelExperienceEdit} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="text-xl font-bold mb-2">{exp.title} at {exp.company}</h4>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{exp.duration}</p>
                    <ul className="list-disc list-inside space-y-1">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{item}</li>
                      ))}
                    </ul>
                    {isAdmin && (
                      <div className="flex space-x-2 mt-4">
                        <button onClick={() => handleEditExperienceClick(exp)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                        <button onClick={() => handleDeleteExperienceClick(exp._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          {isAdmin && (
            <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6 rounded-lg shadow-lg mt-8 max-w-md mx-auto`}>
              <h3 className="text-2xl font-bold text-pink-500 mb-4">Add New Experience</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={newExperience.title}
                  onChange={handleNewExperienceChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={newExperience.company}
                  onChange={handleNewExperienceChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration (e.g., Jan 2023 - Dec 2023)"
                  value={newExperience.duration}
                  onChange={handleNewExperienceChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <textarea
                  name="description"
                  placeholder="Description (comma-separated list of responsibilities)"
                  value={newExperience.description}
                  onChange={handleNewExperienceChange}
                  className="w-full p-2 rounded bg-gray-700 text-white h-24"
                ></textarea>
                <button onClick={handleAddExperienceClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                  Add Experience
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-pink-500 mb-8">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((ach) => (
              <div key={ach._id} className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6 rounded-lg shadow-lg text-left ${isAdmin ? 'py-2' : ''}`}>
                {isAdmin && editingAchievementId === ach._id ? (
                  <div className="flex flex-col w-full space-y-2">
                    <input
                      type="text"
                      name="title"
                      value={editableAchievement.title}
                      onChange={(e) => setEditableAchievement(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Achievement Title"
                    />
                    <input
                      type="text"
                      name="date"
                      value={editableAchievement.date}
                      onChange={(e) => setEditableAchievement(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Date (e.g., 2023)"
                    />
                    <textarea
                      name="description"
                      value={editableAchievement.description}
                      onChange={(e) => setEditableAchievement(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white h-24"
                      placeholder="Description"
                    ></textarea>
                    <input
                      type="text"
                      name="proofLink"
                      value={editableAchievement.proofLink}
                      onChange={(e) => setEditableAchievement(prev => ({ ...prev, proofLink: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Proof Link"
                    />
                    <div className="flex space-x-2 mt-2">
                      <button onClick={handleSaveAchievementEdit} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Save</button>
                      <button onClick={handleCancelAchievementEdit} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="text-xl font-bold mb-2">{ach.title}</h4>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>{ach.date}</p>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{ach.description}</p>
                    {ach.proofLink && ach.proofLink !== '#' && (
                      <a
                        href={ach.proofLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
                      >
                        View Proof
                      </a>
                    )}
                    {isAdmin && (
                      <div className="flex space-x-2 mt-4">
                        <button onClick={() => handleEditAchievementClick(ach)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                        <button onClick={() => handleDeleteAchievementClick(ach._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          {isAdmin && (
            <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6 rounded-lg shadow-lg mt-8 max-w-md mx-auto`}>
              <h3 className="text-2xl font-bold text-pink-500 mb-4">Add New Achievement</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Achievement Title"
                  value={newAchievement.title}
                  onChange={handleNewAchievementChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="date"
                  placeholder="Date (e.g., 2023)"
                  value={newAchievement.date}
                  onChange={handleNewAchievementChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newAchievement.description}
                  onChange={handleNewAchievementChange}
                  className="w-full p-2 rounded bg-gray-700 text-white h-24"
                ></textarea>
                <input
                  type="text"
                  name="proofLink"
                  placeholder="Proof Link"
                  value={newAchievement.proofLink}
                  onChange={handleNewAchievementChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <button onClick={handleAddAchievementClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                  Add Achievement
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-3xl font-bold text-pink-500 mb-8">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert) => (
              <div key={cert._id} className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6 rounded-lg shadow-lg text-left ${isAdmin ? 'py-2' : ''}`}>
                {isAdmin && editingCertificationId === cert._id ? (
                  <div className="flex flex-col w-full space-y-2">
                    <input
                      type="text"
                      name="title"
                      value={editableCertification.title}
                      onChange={(e) => setEditableCertification(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Certification Title"
                    />
                    <input
                      type="text"
                      name="issuer"
                      value={editableCertification.issuer}
                      onChange={(e) => setEditableCertification(prev => ({ ...prev, issuer: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Issuer"
                    />
                    <input
                      type="text"
                      name="date"
                      value={editableCertification.date}
                      onChange={(e) => setEditableCertification(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Date (e.g., Jun 2024)"
                    />
                    <input
                      type="text"
                      name="link"
                      value={editableCertification.link}
                      onChange={(e) => setEditableCertification(prev => ({ ...prev, link: e.target.value }))}
                      className="w-full p-1 rounded bg-gray-700 text-white"
                      placeholder="Certificate Link"
                    />
                    <div className="flex space-x-2 mt-2">
                      <button onClick={handleSaveCertificationEdit} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Save</button>
                      <button onClick={handleCancelCertificationEdit} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="text-xl font-bold mb-2">{cert.title}</h4>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>{cert.issuer} {cert.date && `- ${cert.date}`}</p>
                    {cert.link && cert.link !== '#' && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
                      >
                        View Certificate
                      </a>
                    )}
                    {isAdmin && (
                      <div className="flex space-x-2 mt-4">
                        <button onClick={() => handleEditCertificationClick(cert)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                        <button onClick={() => handleDeleteCertificationClick(cert._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          {isAdmin && (
            <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6 rounded-lg shadow-lg mt-8 max-w-md mx-auto`}>
              <h3 className="text-2xl font-bold text-pink-500 mb-4">Add New Certification</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Certification Title"
                  value={newCertification.title}
                  onChange={handleNewCertificationChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="issuer"
                  placeholder="Issuer"
                  value={newCertification.issuer}
                  onChange={handleNewCertificationChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="date"
                  placeholder="Date (e.g., Jun 2024)"
                  value={newCertification.date}
                  onChange={handleNewCertificationChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="link"
                  placeholder="Certificate Link"
                  value={newCertification.link}
                  onChange={handleNewCertificationChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <button onClick={handleAddCertificationClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                  Add Certification
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QualificationsAchievements;
