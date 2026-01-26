import React from 'react';
import { X, Play, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="relative bg-netflix-black w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-gray-800"
          >
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-black">
              <X className="text-white" />
            </button>

            {/* Banner Area */}
            <div className="h-96 w-full relative">
              <img src={project.thumbnail_url} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent" />
              <h2 className="absolute bottom-8 left-8 text-4xl font-bold">{project.title}</h2>
            </div>

            {/* Content Area */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
                <div className="flex gap-4">
                  <a href={project.video_url} target="_blank" className="flex items-center bg-white text-black px-6 py-2 rounded font-bold hover:bg-white/90">
                    <Play className="mr-2 fill-black" size={20} /> Watch Demo
                  </a>
                  <a href="#" className="flex items-center border border-gray-500 px-6 py-2 rounded font-bold hover:bg-gray-800">
                    <Github className="mr-2" size={20} /> View Code
                  </a>
                </div>
              </div>
              <div className="text-sm space-y-2">
                <p><span className="text-gray-500">Category:</span> {project.category}</p>
                <p><span className="text-gray-500">Released:</span> {new Date(project.created_at).getFullYear()}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
