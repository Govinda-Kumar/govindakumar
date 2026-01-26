import React from 'react';

const Profiles = ({ setLoggedIn }) => {
  const users = [
    { name: 'Recruiter', color: 'bg-blue-500' },
    { name: 'Hiring Manager', color: 'bg-red-600' },
    { name: 'Guest', color: 'bg-gray-500' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-netflix-black">
      <h1 className="text-5xl text-white mb-10">Who's watching?</h1>
      <div className="flex gap-8">
        {users.map((user) => (
          <div 
            key={user.name} 
            onClick={() => setLoggedIn(user)} // Pass the whole object
            className="group cursor-pointer flex flex-col items-center gap-4"
          >
            <div className={`w-32 h-32 rounded ${user.color} group-hover:border-4 border-white transition-all`} />
            <span className="text-gray-400 group-hover:text-white text-xl">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
