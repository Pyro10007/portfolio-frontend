import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Projects = ({ projects, isAdmin, onAddProject, onUpdateProject, onDeleteProject }) => {
  const { theme } = useTheme();
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editableProject, setEditableProject] = useState({});
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '', // Will be comma-separated string
    githubLink: '',
    demoLink: '',
    image: '',
    status: 'Completed',
    featured: false,
  });

  const projectStatuses = ['Completed', 'In Progress', 'Planned'];

  const handleEditClick = (project) => {
    setEditingProjectId(project._id);
    setEditableProject({ ...project, techStack: project.techStack.join(', ') }); // Convert array to string for editing
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setEditableProject({});
  };

  const handleSaveEdit = () => {
    const updatedProject = {
      ...editableProject,
      techStack: editableProject.techStack.split(',').map(tech => tech.trim()).filter(tech => tech !== ''), // Convert string back to array
    };
    onUpdateProject(editingProjectId, updatedProject);
    setEditingProjectId(null);
    setEditableProject({});
  };

  const handleDeleteClick = (id) => {
    onDeleteProject(id);
  };

  const handleNewProjectChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddProjectClick = () => {
    const projectToAdd = {
      ...newProject,
      techStack: newProject.techStack.split(',').map(tech => tech.trim()).filter(tech => tech !== ''),
    };
    onAddProject(projectToAdd);
    setNewProject({ title: '', description: '', techStack: '', githubLink: '', demoLink: '', image: '', status: 'Completed', featured: false }); // Reset form
  };

  return (
    <section id="projects" className={`py-16 px-4 min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg shadow-lg overflow-hidden ${isAdmin ? 'py-2' : ''}`}>
              {isAdmin && editingProjectId === project._id ? (
                <div className="p-6 text-left space-y-3">
                  <input
                    type="text"
                    name="title"
                    value={editableProject.title}
                    onChange={(e) => setEditableProject(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-1 rounded bg-gray-700 text-white"
                    placeholder="Project Title"
                  />
                  <textarea
                    name="description"
                    value={editableProject.description}
                    onChange={(e) => setEditableProject(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-1 rounded bg-gray-700 text-white h-24"
                    placeholder="Project Description"
                  ></textarea>
                  <input
                    type="text"
                    name="techStack"
                    value={editableProject.techStack}
                    onChange={(e) => setEditableProject(prev => ({ ...prev, techStack: e.target.value }))}
                    className="w-full p-1 rounded bg-gray-700 text-white"
                    placeholder="Tech Stack (comma-separated)"
                  />
                  <input
                    type="text"
                    name="githubLink"
                    value={editableProject.githubLink}
                    onChange={(e) => setEditableProject(prev => ({ ...prev, githubLink: e.target.value }))}
                    className="w-full p-1 rounded bg-gray-700 text-white"
                    placeholder="GitHub Link"
                  />
                  <input
                    type="text"
                    name="demoLink"
                    value={editableProject.demoLink}
                    onChange={(e) => setEditableProject(prev => ({ ...prev, demoLink: e.target.value }))}
                    className="w-full p-1 rounded bg-gray-700 text-white"
                    placeholder="Demo Link"
                  />
                  <input
                    type="text"
                    name="image"
                    value={editableProject.image}
                    onChange={(e) => setEditableProject(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full p-1 rounded bg-gray-700 text-white"
                    placeholder="Image URL"
                  />
                  <select
                    name="status"
                    value={editableProject.status}
                    onChange={(e) => setEditableProject(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full p-1 rounded bg-gray-700 text-white"
                  >
                    {projectStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={editableProject.featured}
                      onChange={(e) => setEditableProject(prev => ({ ...prev, featured: e.target.checked }))}
                      className="form-checkbox"
                    />
                    <label htmlFor="featured">Featured</label>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button onClick={handleSaveEdit} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Save</button>
                    <button onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-6 text-left">
                    <h3 className="text-2xl font-bold text-pink-500 mb-2">{project.title}</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, techIndex) => (
                        <span key={techIndex} className={`${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} text-sm px-3 py-1 rounded-full`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        GitHub
                      </a>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 transition-colors duration-300"
                      >
                        Live Demo
                      </a>
                    </div>
                    {isAdmin && (
                      <div className="flex space-x-2 mt-4">
                        <button onClick={() => handleEditClick(project)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                        <button onClick={() => handleDeleteClick(project._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        {isAdmin && (
          <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6 rounded-lg shadow-lg mt-8 max-w-md mx-auto`}>
            <h3 className="text-2xl font-bold text-pink-500 mb-4">Add New Project</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={newProject.title}
                onChange={handleNewProjectChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={newProject.description}
                onChange={handleNewProjectChange}
                className="w-full p-2 rounded bg-gray-700 text-white h-24"
              ></textarea>
              <input
                type="text"
                name="techStack"
                placeholder="Tech Stack (comma-separated)"
                value={newProject.techStack}
                onChange={handleNewProjectChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="githubLink"
                placeholder="GitHub Link"
                value={newProject.githubLink}
                onChange={handleNewProjectChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="demoLink"
                placeholder="Demo Link"
                value={newProject.demoLink}
                onChange={handleNewProjectChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newProject.image}
                onChange={handleNewProjectChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <select
                name="status"
                value={newProject.status}
                onChange={handleNewProjectChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                {projectStatuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={newProject.featured}
                  onChange={handleNewProjectChange}
                  className="form-checkbox"
                />
                <label htmlFor="featured">Featured</label>
              </div>
              <button onClick={handleAddProjectClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                Add Project
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
