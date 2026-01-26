import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';

const Navbar = ({ setView, userProfile, onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-4 flex items-center justify-between ${isScrolled ? 'bg-netflix-black shadow-md' : 'bg-transparent'}`}>
      
      {/* Left Side: Logo & Links */}
      <div className="flex items-center gap-4 md:gap-10">
        <h1 onClick={() => setView('home')}  className="text-netflix-red font-black text-2xl md:text-3xl tracking-tighter cursor-pointer">
          PORTFOLIO
        </h1>
        <ul className="flex gap-5 text-sm">
          <li onClick={() => setView('home')} className="cursor-pointer hover:text-gray-300">Home</li>
          <li onClick={() => setView('projects')} className="cursor-pointer hover:text-gray-300">Projects</li>
          <li className="cursor-pointer hover:text-gray-300">New & Popular</li>
          <li className="cursor-pointer hover:text-gray-300">My List</li>
        </ul>
      </div>
      
      {/* Right Side: Search, Notifications, Profile */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* Animated Search Bar */}
        <div className={`flex items-center border transition-all duration-300 px-2 py-1 ${searchActive ? 'w-40 md:w-64 bg-black' : 'w-10 border-transparent'}`}>
          <Search 
            className="cursor-pointer text-white w-5 h-5" 
            onClick={() => setSearchActive(!searchActive)} 
          />
          {searchActive && (
            <input
              autoFocus
              type="text"
              placeholder="Titles, categories..."
              className="bg-transparent border-none outline-none text-white ml-2 text-sm w-full focus:ring-0"
              onChange={(e) => onSearch(e.target.value)}
            />
          )}
        </div>

        <p className="hidden md:block text-sm cursor-pointer hover:text-gray-300">{userProfile.name}</p>
        <Bell className="w-5 h-5 cursor-pointer" />
        <div className="flex items-center gap-6">
        {/* Dynamic Avatar using the color from the selected profile */}
        <div className={`w-8 h-8 rounded ${userProfile?.color || 'bg-blue-500'} cursor-pointer hover:ring-2 ring-white`} />
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
