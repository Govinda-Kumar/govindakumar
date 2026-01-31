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

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    if (query.trim().length > 2) {
      setIsSearching(true);
      try {
        // Point to your FastAPI search endpoint
        const res = await axios.get(`http://127.0.0.1{query}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error("Search failed:", err);
      }
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  if (!isLoggedIn) {
    return <Profiles setLoggedIn={(user) => {
      setIsLoggedIn(true);
      setUserProfile(user);
    }} />;
  }

  return (
    <div className="bg-netflix-black min-h-screen text-white overflow-x-hidden">
      <Navbar
        setView={setView}
        userProfile={userProfile}
        onSearch={handleSearch}
      />

      {/* 1. Search Results (Highest Priority) */}
      {isSearching ? (
        <div className="pt-32 px-12">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {searchResults.map(p => (
              <div key={p.id} onClick={() => setSelectedProject(p)} className="cursor-pointer hover:scale-105 transition">
                <img src={p.thumbnail_url} className="rounded aspect-video object-cover" alt="" />
                <p className="mt-2 text-sm">{p.title}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 2. Standard View (Home or Projects) */
        <>
          {view === 'home' ? (
            <>
              <Hero />
              <div className="relative z-20 -mt-32 pb-20">
                <Row title="Featured Projects" isFeatured={true} onSelect={setSelectedProject} />
                <Row title="Machine Learning" category="machine_learning" onSelect={setSelectedProject} />
                <Row title="Web Apps" category="web_apps" onSelect={setSelectedProject} />
              </div>
            </>
          ) : (
            <div className="pt-32 px-12 pb-20">
              <h1 className="text-3xl font-bold mb-8 text-gray-200">All Projects</h1>
              <ProjectGrid onSelect={setSelectedProject} />
            </div>
          )}
        </>
      )}

      {selectedProject && (
        <Modal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );


}

export default App;
