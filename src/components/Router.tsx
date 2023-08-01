import React from "react";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import PVP from "./PVP";
import Rules from "./Rules";

function Router() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
              <Route path="/PVP" element={<PVP />} />
              <Route path="/Rules" element={<Rules />} />
      </Routes>
    </div>
  );
}

export default Router;
