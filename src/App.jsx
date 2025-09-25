// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AnimatedBackground from "./components/AnimatedBackground";
import MainPage from "./pages/MainPage";
import FashionFeed from "./components/FashionFeed.jsx"

function App() {
  const handleSearch = (term) => {
    console.log("Searching for:", term);
    alert(`Predicting trends for: "${term}"`);
  };

  return (
    <>
      <AnimatedBackground />
      <Routes>
        <Route path="/" element={<MainPage onSearch={handleSearch} />} />
          <Route path="/FashionFeed" element={<FashionFeed onSearch={handleSearch} />} />
      </Routes>
    </>
  );
}

export default App;
