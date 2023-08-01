import React from "react";

function Navbar() {
  return (
    <nav>
      <div className="icon-cont">
        <div className="icon red"></div>
        <div className="icon yellow"></div>
        <div className="icon yellow"></div>
        <div className="icon red"></div>
      </div>
      <p className="connect-four">
        <span className="redf">C</span>
        <span className="yellowf">o</span>
        <span className="bluef">n</span>
        <span className="greenf">n</span>
        <span className="yellowf">e</span>
        <span className="redf">c</span>
        <span className="bluef">t </span>
        <span className="greenf">F</span>
        <span className="bluef">o</span>
        <span className="yellowf">u</span>
        <span className="redf">r</span>
      </p>
    </nav>
  );
}

export default Navbar;
