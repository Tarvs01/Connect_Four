import React, { createContext } from "react";
import { ContextItems } from "../types";

const AppContext = createContext<ContextItems | null>(null);

function AppProvider({ children }: any) {
  function play(player: number, column: number, board: number[][]) {
    if (board[0][column] !== 0) {
      return false;
    } else {
      for (let i = 6; i > -1; i--) {
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
