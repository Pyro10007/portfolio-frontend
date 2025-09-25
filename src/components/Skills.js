import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Skills = ({ skills, isAdmin, onAddSkill, onUpdateSkill, onDeleteSkill }) => {
  const { theme } = useTheme();
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editableSkill, setEditableSkill] = useState({});
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Technical', proficiency: 'Intermediate', icon: '', order: 0 });

  const categories = ['Technical', 'Soft Skills', 'Languages', 'Tools', 'Frameworks', 'Documentation Tools', 'Illustration & Visualization', 'Programming Exposure', 'Engineering Knowledge', 'Process & QA', 'Office & Productivity Tools', 'Core Strengths'];
  const proficiencies = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {});

  const handleEditClick = (skill) => {
    setEditingSkillId(skill._id);
    setEditableSkill({ ...skill });
  };

  const handleCancelEdit = () => {
    setEditingSkillId(null);
    setEditableSkill({});
  };

  const handleSaveEdit = () => {
    onUpdateSkill(editingSkillId, editableSkill);
    setEditingSkillId(null);
    setEditableSkill({});
  };

  const handleDeleteClick = (id) => {
    onDeleteSkill(id);
  };

  const handleNewSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkillClick = () => {
    onAddSkill(newSkill);
    setNewSkill({ name: '', category: 'Technical', proficiency: 'Intermediate', icon: '', order: 0 }); // Reset form
  };

  return (
    <section id="skills" className={`py-16 px-4 min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6 rounded-lg shadow-lg`}>
              <h3 className="text-2xl font-bold text-pink-500 mb-4">{category}</h3>
              <ul className="space-y-3">
                {skills.map((skill) => (
                  <li key={skill._id} className={`flex justify-between items-center text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} ${isAdmin ? 'py-2' : ''}`}>
                    {isAdmin && editingSkillId === skill._id ? (
                      <div className="flex flex-col w-full space-y-2">
                        <input
                          type="text"
                          name="name"
                          value={editableSkill.name}
                          onChange={(e) => setEditableSkill(prev => ({ ...prev, name: e.target.value }))}
                          className="p-1 rounded bg-gray-700 text-white"
                        />
                        <select
                          name="category"
                          value={editableSkill.category}
                          onChange={(e) => setEditableSkill(prev => ({ ...prev, category: e.target.value }))}
                          className="p-1 rounded bg-gray-700 text-white"
                        >
                          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <select
                          name="proficiency"
                          value={editableSkill.proficiency}
                          onChange={(e) => setEditableSkill(prev => ({ ...prev, proficiency: e.target.value }))}
                          className="p-1 rounded bg-gray-700 text-white"
                        >
                          {proficiencies.map(prof => <option key={prof} value={prof}>{prof}</option>)}
                        </select>
                        <div className="flex space-x-2 mt-2">
                          <button onClick={handleSaveEdit} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Save</button>
                          <button onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span>{skill.name}</span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{skill.proficiency}</span>
                        {isAdmin && (
                          <div className="flex space-x-2 ml-4">
                            <button onClick={() => handleEditClick(skill)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                            <button onClick={() => handleDeleteClick(skill._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {isAdmin && (
          <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6 rounded-lg shadow-lg mt-8 max-w-md mx-auto`}>
            <h3 className="text-2xl font-bold text-pink-500 mb-4">Add New Skill</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Skill Name"
                value={newSkill.name}
                onChange={handleNewSkillChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <select
                name="category"
                value={newSkill.category}
                onChange={handleNewSkillChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select
                name="proficiency"
                value={newSkill.proficiency}
                onChange={handleNewSkillChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                {proficiencies.map(prof => <option key={prof} value={prof}>{prof}</option>)}
              </select>
              <button onClick={handleAddSkillClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                Add Skill
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
