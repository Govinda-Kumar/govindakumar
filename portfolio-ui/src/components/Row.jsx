import React, { useEffect, useState } from 'react';
import { getProjects } from '../api'; // Using your helper

const Row = ({ title, category, isFeatured, onSelect }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Construct params to match your FastAPI query parameters
    const params = {};
    if (isFeatured) params.is_featured = "true";
    if (category) params.category = category;

    getProjects(params)
      .then((res) => {
        setProjects(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error(`Error loading row "${title}":`, err);
      });
  }, [category, isFeatured, title]);

  return (
    <div className="ml-10 my-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex gap-2 overflow-x-scroll no-scrollbar p-4 -m-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelect && onSelect(project)}
              className="relative min-w-[240px] h-32 transition-transform duration-300 hover:scale-110 hover:z-50 cursor-pointer"
            >
              <img
                src={project.thumbnail_url}
                className="w-full h-full object-cover rounded-sm shadow-md"
                alt="" // Keeps "Dummy" text hidden
              />
            </div>
          ))
        ) : (
          <div className="h-32 flex items-center text-gray-600 italic">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Row;
