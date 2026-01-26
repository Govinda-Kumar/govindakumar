import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import axios from 'axios';
import { getFeaturedProject } from '../api';

const Hero = () => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        getFeaturedProject()
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => console.error(err));
    }, []);


    if (!movie) return <div className="h-[85vh] bg-netflix-black" />;

    return (
        <div className="relative h-[85vh] w-full text-white">
            {/* Background Image/Video */}
            <div className="absolute inset-0">
                <img
                    src={movie.thumbnail_url}
                    alt={movie.title}
                    className="w-full h-full object-cover brightness-[0.7]"
                />
                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent" />
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-netflix-black to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="relative pt-[20%] px-12 z-10 space-y-6">
                <h1 className="text-6xl font-bold max-w-2xl drop-shadow-lg">
                    {movie.title}
                </h1>
                <p className="text-lg max-w-xl line-clamp-3 drop-shadow-md text-gray-200">
                    {movie.description}
                </p>

                <div className="flex gap-4 pt-4">
                    <button className="flex items-center bg-white text-black px-8 py-2.5 rounded font-bold hover:bg-opacity-80 transition duration-300">
                        <Play className="w-6 h-6 mr-2 fill-black" /> Play
                    </button>
                    <button className="flex items-center bg-gray-500/50 text-white px-8 py-2.5 rounded font-bold hover:bg-gray-500/30 transition duration-300 backdrop-blur-sm">
                        <Info className="w-6 h-6 mr-2" /> More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
