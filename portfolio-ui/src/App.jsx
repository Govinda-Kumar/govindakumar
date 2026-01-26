import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Row from './components/Row';

function App() {
  return (
    <div className="bg-netflix-black min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Shift rows up slightly to overlap the Hero fade */}
      <div className="relative z-20 -mt-32 pb-20">
        <Row title="Trending Now" />
        <Row title="Web Applications" />
        <Row title="Machine Learning Projects" />
      </div>
    </div>
  );
}

export default App;
