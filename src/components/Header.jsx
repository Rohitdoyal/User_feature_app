import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
    <h1 className="text-xl font-bold">React App</h1>
    <nav>
      <Link to="/" className="px-4">Home</Link>
      <Link to="/profile" className="px-4">Profile</Link>
    </nav>
  </header>
);

export default Header;
