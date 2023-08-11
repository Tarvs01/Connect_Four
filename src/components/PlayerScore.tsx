import React from "react";

function PlayerScore({
  score,
  playerNumber,
}: {
  score: number;
  playerNumber: string;
}) {
  return <div>Player {playerNumber} : {score}</div>;
}

export default PlayerScore;
