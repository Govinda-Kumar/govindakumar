import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Row from './components/Row';
import Profiles from './components/Profiles';
import Modal from './components/Modal';
import ProjectGrid from './components/ProjectGrid';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Store selected profile
  const [view, setView] = useState('home'); // 'home' or 'projects'
  const [selectedProject, setSelectedProject] = useState(null);

  if (!isLoggedIn) {
    return <Profiles setLoggedIn={(user) => { 
      setIsLoggedIn(true); 
      setUserProfile(user); 
    }} />;
  }

  return (
    <div className="bg-netflix-black min-h-screen text-white">
      {/* Pass setView and userProfile to Navbar */}
      <Navbar setView={setView} userProfile={userProfile} />
      
      {view === 'home' ? (
        <>
          <Hero />
          <div className="relative z-20 -mt-32 pb-20">
            <Row title="Trending Now" onSelect={setSelectedProject} />
          </div>
        </>
      ) : (
        /* The Projects Tile Gallery */
        <div className="pt-32 px-12 pb-20">
          <h1 className="text-3xl font-bold mb-8">All Projects</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* We'll fetch all projects here like the Search Grid */}
            <ProjectGrid onSelect={setSelectedProject} />
          </div>
        </div>
      )}

      <Modal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}


export default App;
