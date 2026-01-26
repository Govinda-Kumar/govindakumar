import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls more than 100px, change background
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-10 py-4 flex items-center justify-between ${isScrolled ? 'bg-netflix-black' : 'bg-transparent'}`}>
      <div className="flex items-center gap-8">
        {/* Iconic Netflix-style Logo Text */}
        <h1 className="text-netflix-red font-black text-3xl tracking-tighter cursor-pointer">
          GOVINDA
        </h1>
        <ul className="hidden md:flex gap-5 text-sm font-light text-gray-200">
          <li className="cursor-pointer hover:text-gray-400">Home</li>
          <li className="cursor-pointer hover:text-gray-400">Projects</li>
          <li className="cursor-pointer hover:text-gray-400">New & Popular</li>
          <li className="cursor-pointer hover:text-gray-400">My List</li>
        </ul>
      </div>
      
      <div className="flex items-center gap-5">
         <div className="w-8 h-8 bg-blue-500 rounded cursor-pointer"></div> {/* Profile Placeholder */}
      </div>
    </nav>
  );
};

export default Navbar;
