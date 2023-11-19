import React from "react";
import { Link } from "react-router-dom";

function Rules() {
  return (
    <main className="rules-container">
      <div className="rules-cont">
        <p className="rules-name">RULES</p>
        <ol>
          <li>
            A player wins when they have four consecutive tiles in a row. Either
            horizontally, vertically or diagonally.
          </li>
          <li>
            There are no double turns, each player has a turn before the other
            player.
          </li>
          <li>There is no time limit between plays</li>
        </ol>
      </div>

      <button>
        <Link to={"/"}>Back</Link>
      </button>
    </main>
  );
}

export default Rules;
