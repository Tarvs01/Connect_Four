import React from "react";
import { getNextOptimalMove } from "../helpers/nextBestMove";

function Rules() {
  console.log(
    getNextOptimalMove(
      [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [2, 0, 1, 1, 0, 0, 0],
      ],
      2
    )
  );

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
          <li>pa</li>
          <li>na</li>
        </ol>
      </div>
    </main>
  );
}

export default Rules;
