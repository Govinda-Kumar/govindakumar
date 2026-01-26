import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Row = ({ title, onSelect }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Connect to your FastAPI to get the list of projects
    axios.get('http://127.0.0.1')
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("Error fetching projects for Row:", err);
      });
  }, []);

  return (
    <div className="ml-10 my-10">
      {/* Category Title (e.g., Trending Now) */}
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      {/* Horizontal Scroll Container */}
      <div className="flex gap-2 overflow-x-scroll no-scrollbar p-4 -m-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            // This line triggers the Modal in App.jsx
            onClick={() => onSelect(project)} 
            className="relative min-w-[240px] h-32 transition-transform duration-300 ease-in-out hover:scale-110 hover:z-30 cursor-pointer"
          >
            <img 
              src={project.thumbnail_url} 
              alt={project.title}
              className="w-full h-full object-cover rounded-sm shadow-lg"
            />
            
            {/* Hover Overlay Title */}
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
              <span className="text-xs font-bold truncate">{project.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
