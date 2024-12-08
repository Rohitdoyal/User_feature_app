import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import BookFinder from "./pages/BookFinder.jsx";
import WeatherNow from "./pages/WeatherNow.jsx";
import RecipeIdeas from "./pages/RecipeIdeas.jsx";
import EarthquakeVisualizer from "./pages/EarthquakeVisualizer.jsx";
import './styles.css'; 
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-finder" element={<BookFinder />} />
        <Route path="/weather-now" element={<WeatherNow />} />
        <Route path="/recipe-ideas" element={<RecipeIdeas />} />
        <Route path="/earthquake-visualizer" element={<EarthquakeVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;
