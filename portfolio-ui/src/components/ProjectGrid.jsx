import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { allProjects } from '../api';

const ProjectGrid = ({ onSelect }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    allProjects()
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {projects.map((project) => (
        <div key={project.id} onClick={() => onSelect(project)} className="cursor-pointer group">
          <div className="aspect-video overflow-hidden rounded-md bg-gray-800">
            <img src={project.thumbnail_url} className="w-full h-full object-cover group-hover:scale-110 transition" alt="" />
          </div>
          <h3 className="mt-2 font-bold text-sm">{project.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;