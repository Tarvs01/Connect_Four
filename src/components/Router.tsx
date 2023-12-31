import React from "react";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import PVP from "./PVP";
import Rules from "./Rules";
import PVC from "./PVC";
import DifficultySelection from "./DifficultySelection";

function Router() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/PVP" element={<PVP />} />
        <Route path="/Rules" element={<Rules />} />
        <Route path="/PVC" element={<PVC />} />
        <Route path="/difficulty-selection" element={<DifficultySelection />} />
      </Routes>
    </div>
  );
}

export default Router;
