import React from "react";
import Board from "./Board";
import PlayerScore from "./PlayerScore"

function PVP() {
  return <div><PlayerScore /><Board /><PlayerScore /></div>;
}

export default PVP;
