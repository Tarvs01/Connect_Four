import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <div className="menu-items-cont">
        <div className="menu-item redb">
          <Link to={"/PVC"}>Play VS Computer</Link>
        </div>
        <div className="menu-item yellowb">
          <Link to={"/PVP"}>Play VS Human</Link>
        </div>
        <div className="menu-item blueb">
          <Link to={"/Rules"}>Read Rules</Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
