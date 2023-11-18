import React, { createContext, useState } from "react";
import { ContextItems } from "../types";

const AppContext = createContext<ContextItems | null>(null);

function AppProvider({ children }: any) {
  const [computerDifficulty, setComputerDifficulty] = useState(6);

  function play(player: number, column: number, board: number[][]) {
    if (board[0][column] !== 0) {
      return false;
    } else {
      for (let i = 5; i > -1; i--) {
        if (board[i][column] === 0) {
          board[i][column] = player;
          break;
        }
      }
    }
    return true;
  }
  return (
    <AppContext.Provider
      value={{
        play,
        computerDifficulty,
        setComputerDifficulty,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
