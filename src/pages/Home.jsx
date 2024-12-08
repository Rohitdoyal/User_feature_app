import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-8 underline decoration-solid ">Welcome to the Home Page</h1>
      
      <div className="space-y-4 flex flex-col items-center">

        <Link to="/book-finder">
          <button className="px-6 py-3 w-[400px] btn ml-2 ">
            Book Finder
          </button>
        </Link>

        
        
        <Link to="/weather-now">
        
          <button className="px-6 py-3 w-[400px] btn ml-2 ">
            Weather Now
          </button>
        </Link>

        <Link to="/recipe-ideas">
          <button className="px-6 py-3 w-[400px] btn ml-2 ">
            Recipe Ideas
          </button>
        </Link>
        
        <Link to="/earthquake-visualizer">
          <button className="px-6 py-3 w-[400px] btn ml-2 ">
            Earthquake Visualizer
          </button>
        </Link>
        
        
      </div>
    </div>
  );
};

export default Home;