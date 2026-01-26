import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Row = ({ title }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch all projects from FastAPI
    axios.get('http://127.0.0.1')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ml-10 my-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      {/* Horizontal Scroll Container */}
      <div className="flex gap-2 overflow-x-scroll no-scrollbar p-4 -m-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="relative min-w-[240px] h-32 transition-transform duration-300 ease-in-out hover:scale-110 hover:z-30 cursor-pointer"
          >
            <img 
              src={project.thumbnail_url} 
              alt={project.title}
              className="w-full h-full object-cover rounded-sm"
            />
            {/* Subtle Title Overlay on card */}
            <div className="absolute bottom-2 left-2 text-xs font-bold drop-shadow-lg">
              {project.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
