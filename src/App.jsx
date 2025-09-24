// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AnimatedBackground from "./components/AnimatedBackground";
import MainPage from "./pages/MainPage";

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
      </Routes>
    </>
  );
}

export default App;
