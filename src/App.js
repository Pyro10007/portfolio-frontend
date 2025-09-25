import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import QualificationsAchievements from './components/QualificationsAchievements';
import Contact from './components/Contact';
import { useTheme } from './context/ThemeContext';
import AdminLogin from './components/AdminLogin'; // Import AdminLogin component

// Admin components
const AdminDashboard = () => <h1 className="text-white dark:text-white light:text-gray-800 text-4xl font-bold">Admin Dashboard Page</h1>;

function App() {
  const { theme } = useTheme();
  const [isAdmin, setIsAdmin] = useState(() => {
    // Initialize isAdmin based on token in localStorage
    return localStorage.getItem('token') ? true : false;
  });
  const [ownerProfile, setOwnerProfile] = useState({
    profileImageUrl: 'https://via.placeholder.com/40x40/FF69B4/FFFFFF?text=Logo', // Default for Navbar
    heroImageUrl: 'https://via.placeholder.com/400/000000/FFFFFF?text=Your+Photo', // Default for Hero
    name: 'Pranith Puthanpurakkal Baburaj',
    profession: 'Proactive Technical Writer',
    missionStatement: 'Creating clear, user-focused documentation and visual communication, leveraging an engineering background to bridge complex technical concepts with accessible content.',
    aboutMeParagraph1: "Hello! I'm Pranith Puthanpurakkal Baburaj, a proactive and detail-oriented Technical Writer with a strong engineering background. With 1 year of hands-on experience, I specialize in creating clear, user-focused documentation, structured authoring, and technical illustrations. My expertise spans producing IFUs, service manuals, and user guides with a focus on regulatory compliance and usability. I am proficient in DITA XML authoring, ST4, FrameMaker, Windchill, Acrobat Pro, and Markdown, complemented by a strong background in technical illustrations using Adobe Illustrator, Arbortext IsoDraw, Creo View, and CorelDRAW. My engineering foundation includes embedded systems, robotics, control systems, and communication protocols, enabling me to bridge complex technical concepts with accessible content.",
    aboutMeParagraph2: "I thrive in dynamic environments, adapting quickly to new tools and agile workflows, and excel in multi-functional team collaboration. My analytical mindset and problem-solving orientation drive detail-focused execution across structured content pipelines. Outside of my professional life, I enjoy exploring new technologies, strategic games like chess, visual content creation, and engaging in arts such as singing and visual storytelling. I am always eager to connect with fellow professionals and explore opportunities to contribute to content design, system documentation, and visual communication, while expanding my expertise in automation and next-gen documentation tools.",
  });
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchOwnerProfile = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/owner-profile'); // Fetch from backend
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOwnerProfile({
          profileImageUrl: data.profileImageUrl.startsWith('/uploads') ? `http://localhost:5001${data.profileImageUrl}` : data.profileImageUrl,
          heroImageUrl: data.profileImageUrl.startsWith('/uploads') ? `http://localhost:5001${data.profileImageUrl}` : data.profileImageUrl,
          name: data.name,
          profession: data.profession,
          missionStatement: data.missionStatement,
          aboutMeParagraph1: data.aboutMeParagraph1,
          aboutMeParagraph2: data.aboutMeParagraph2,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          contactLinkedIn: data.contactLinkedIn,
        });
      } catch (error) {
        console.error("Failed to fetch owner profile:", error);
        // Keep default placeholders if fetch fails
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/skills');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/projects');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    const fetchQualifications = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/qualifications');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQualifications(data);
      } catch (error) {
        console.error("Failed to fetch qualifications:", error);
      }
    };

    const fetchExperiences = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/experience');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      }
    };

    const fetchAchievements = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/achievements');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAchievements(data);
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      }
    };

    const fetchCertifications = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/certifications');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCertifications(data);
      } catch (error) {
        console.error("Failed to fetch certifications:", error);
      }
    };

    fetchOwnerProfile();
    fetchSkills();
    fetchProjects();
    fetchQualifications();
    fetchExperiences();
    fetchAchievements();
    fetchCertifications();
  }, []);

  const updateProfileImage = (newImageUrl) => {
    setOwnerProfile(prev => ({
      ...prev,
      profileImageUrl: newImageUrl.startsWith('/uploads') ? `http://localhost:5001${newImageUrl}?t=${Date.now()}` : newImageUrl,
      heroImageUrl: newImageUrl.startsWith('/uploads') ? `http://localhost:5001${newImageUrl}?t=${Date.now()}` : newImageUrl,
    }));
  };

  const handleSaveOwnerProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/owner-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setOwnerProfile(prev => ({ ...prev, ...updatedData }));
      } else {
        alert(`Error saving profile: ${data.message}`);
      }
    } catch (error) {
      console.error('Error saving owner profile:', error);
      alert('Error saving owner profile.');
    }
  };

  const handleAddSkill = async (newSkill) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newSkill),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Skill added successfully!');
        setSkills(prevSkills => [...prevSkills, data]);
      } else {
        alert(`Error adding skill: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error adding skill:', error);
      alert('Error adding skill.');
    }
  };

  const handleUpdateSkill = async (id, updatedSkill) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/skills/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSkill),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Skill updated successfully!');
        setSkills(prevSkills => prevSkills.map(skill => (skill._id === id ? data : skill)));
      } else {
        alert(`Error updating skill: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error updating skill:', error);
      alert('Error updating skill.');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('Skill deleted successfully!');
        setSkills(prevSkills => prevSkills.filter(skill => skill._id !== id));
      } else {
        alert(`Error deleting skill: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      alert('Error deleting skill.');
    }
  };

  const handleAddProject = async (newProject) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Project added successfully!');
        setProjects(prevProjects => [...prevProjects, data]);
      } else {
        alert(`Error adding project: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error adding project.');
    }
  };

  const handleUpdateProject = async (id, updatedProject) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProject),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Project updated successfully!');
        setProjects(prevProjects => prevProjects.map(project => (project._id === id ? data : project)));
      } else {
        alert(`Error updating project: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating project.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('Project deleted successfully!');
        setProjects(prevProjects => prevProjects.filter(project => project._id !== id));
      } else {
        alert(`Error deleting project: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project.');
    }
  };

  const handleAddQualification = async (newQualification) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/qualifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newQualification),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Qualification added successfully!');
        setQualifications(prevQualifications => [...prevQualifications, data]);
      } else {
        alert(`Error adding qualification: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error adding qualification:', error);
      alert('Error adding qualification.');
    }
  };

  const handleUpdateQualification = async (id, updatedQualification) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/qualifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedQualification),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Qualification updated successfully!');
        setQualifications(prevQualifications => prevQualifications.map(qa => (qa._id === id ? data : qa)));
      } else {
        alert(`Error updating qualification: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error updating qualification:', error);
      alert('Error updating qualification.');
    }
  };

  const handleDeleteQualification = async (id) => {
    if (!window.confirm('Are you sure you want to delete this qualification?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/qualifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('Qualification deleted successfully!');
        setQualifications(prevQualifications => prevQualifications.filter(qa => qa._id !== id));
      } else {
        alert(`Error deleting qualification: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting qualification:', error);
      alert('Error deleting qualification.');
    }
  };

  const handleAddExperience = async (newExperience) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newExperience),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Experience added successfully!');
        setExperiences(prevExperiences => [...prevExperiences, data]);
      } else {
        alert(`Error adding experience: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error adding experience:', error);
      alert('Error adding experience.');
    }
  };

  const handleUpdateExperience = async (id, updatedExperience) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/experience/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedExperience),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Experience updated successfully!');
        setExperiences(prevExperiences => prevExperiences.map(exp => (exp._id === id ? data : exp)));
      } else {
        alert(`Error updating experience: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error updating experience:', error);
      alert('Error updating experience.');
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/experience/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('Experience deleted successfully!');
        setExperiences(prevExperiences => prevExperiences.filter(exp => exp._id !== id));
      } else {
        alert(`Error deleting experience: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert('Error deleting experience.');
    }
  };

  const handleAddAchievement = async (newAchievement) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newAchievement),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Achievement added successfully!');
        setAchievements(prevAchievements => [...prevAchievements, data]);
      } else {
        alert(`Error adding achievement: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error adding achievement:', error);
      alert('Error adding achievement.');
    }
  };

  const handleUpdateAchievement = async (id, updatedAchievement) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/achievements/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedAchievement),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Achievement updated successfully!');
        setAchievements(prevAchievements => prevAchievements.map(ach => (ach._id === id ? data : ach)));
      } else {
        alert(`Error updating achievement: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error updating achievement:', error);
      alert('Error updating achievement.');
    }
  };

  const handleDeleteAchievement = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/achievements/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('Achievement deleted successfully!');
        setAchievements(prevAchievements => prevAchievements.filter(ach => ach._id !== id));
      } else {
        alert(`Error deleting achievement: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting achievement:', error);
      alert('Error deleting achievement.');
    }
  };

  const handleAddCertification = async (newCertification) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/certifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newCertification),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Certification added successfully!');
        setCertifications(prevCertifications => [...prevCertifications, data]);
      } else {
        alert(`Error adding certification: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error adding certification:', error);
      alert('Error adding certification.');
    }
  };

  const handleUpdateCertification = async (id, updatedCertification) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/certifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCertification),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Certification updated successfully!');
        setCertifications(prevCertifications => prevCertifications.map(cert => (cert._id === id ? data : cert)));
      } else {
        alert(`Error updating certification: ${data.message || data.errors[0].msg}`);
      }
    } catch (error) {
      console.error('Error updating certification:', error);
      alert('Error updating certification.');
    }
  };

  const handleDeleteCertification = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/certifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('Certification deleted successfully!');
        setCertifications(prevCertifications => prevCertifications.filter(cert => cert._id !== id));
      } else {
        alert(`Error deleting certification: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting certification:', error);
      alert('Error deleting certification.');
    }
  };

  return (
    <Router>
      <div className={`min-h-screen font-poppins ${theme === 'dark' ? 'dark' : 'light'}`}>
        <Navbar 
          isAdmin={isAdmin} 
          setIsAdmin={setIsAdmin} 
          profileImageUrl={ownerProfile.profileImageUrl} // Pass profile image to Navbar
        />
        <main className="pt-16">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Hero 
                    name={ownerProfile.name} 
                    profession={ownerProfile.profession} 
                    missionStatement={ownerProfile.missionStatement} 
                    imageUrl={ownerProfile.heroImageUrl}
                    isAdmin={isAdmin}
                    updateProfileImage={updateProfileImage} // Pass update function to Hero
                    onSave={handleSaveOwnerProfile} // Pass save function to Hero
                  />
                  <About
                    aboutMeParagraph1={ownerProfile.aboutMeParagraph1}
                    aboutMeParagraph2={ownerProfile.aboutMeParagraph2}
                    isAdmin={isAdmin}
                    onSave={handleSaveOwnerProfile}
                  />
                  <Skills 
                    skills={skills}
                    isAdmin={isAdmin}
                    onAddSkill={handleAddSkill}
                    onUpdateSkill={handleUpdateSkill}
                    onDeleteSkill={handleDeleteSkill}
                  />
                  <Projects 
                    projects={projects}
                    isAdmin={isAdmin}
                    onAddProject={handleAddProject}
                    onUpdateProject={handleUpdateProject}
                    onDeleteProject={handleDeleteProject}
                  />
                  <QualificationsAchievements 
                    qualifications={qualifications}
                    experiences={experiences}
                    achievements={achievements}
                    certifications={certifications}
                    isAdmin={isAdmin}
                    onAddQualification={handleAddQualification}
                    onUpdateQualification={handleUpdateQualification}
                    onDeleteQualification={handleDeleteQualification}
                    onAddExperience={handleAddExperience}
                    onUpdateExperience={handleUpdateExperience}
                    onDeleteExperience={handleDeleteExperience}
                    onAddAchievement={handleAddAchievement}
                    onUpdateAchievement={handleUpdateAchievement}
                    onDeleteAchievement={handleDeleteAchievement}
                    onAddCertification={handleAddCertification}
                    onUpdateCertification={handleUpdateCertification}
                    onDeleteCertification={handleDeleteCertification}
                  />
                  <Contact
                    contactEmail={ownerProfile.contactEmail}
                    contactPhone={ownerProfile.contactPhone}
                    contactLinkedIn={ownerProfile.contactLinkedIn}
                    isAdmin={isAdmin}
                    onSave={handleSaveOwnerProfile}
                  />
                </>
              } 
            />
            {/* Individual routes for sections if needed, or they can be scrolled to from home */}
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/qualifications-achievements" element={<QualificationsAchievements />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
