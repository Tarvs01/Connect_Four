import { CheckWinnerReturn } from "../types";

export function checkWinner(board: number[][]) : CheckWinnerReturn {
  // Function to check if there are four consecutive pieces of a player in a given array
  let winningPlayer = 0;
  function checkConsecutive(arr : number[], player : number) : boolean {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === player) {
        count++;
        if (count === 4) {
          winningPlayer = player;
          return true;
        }
      } else {
        count = 0;
      }
    }
    return false;
  }

  const rows = board.length;
  const cols = board[0].length;

  // Check for horizontal wins
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (checkConsecutive(board[row].slice(col, col + 4), 1) || checkConsecutive(board[row].slice(col, col + 4), 2)) {
        return { hasWinner: true, column: col + 3, row: row, winner: winningPlayer, direction: "horizontal" };
      }
    }
  }

  // Check for vertical wins
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row <= rows - 4; row++) {
      if (checkConsecutive([board[row][col], board[row + 1][col], board[row + 2][col], board[row + 3][col]], 1) || checkConsecutive([board[row][col], board[row + 1][col], board[row + 2][col], board[row + 3][col]], 2)) {
        return { hasWinner: true,column: col, row: row + 3, winner: winningPlayer, direction: "vertical" };
      }
    }
  }

  // Check for diagonal wins (positive slope)
  for (let row = 0; row <= rows - 4; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (checkConsecutive([board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3]], 1) || checkConsecutive([board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3]], 2)) {
        return { hasWinner: true, column: col + 3, row: row + 3, winner: winningPlayer, direction: "diagonalPositive" };
      }
    }
  }

  // Check for diagonal wins (negative slope)
  for (let row = 0; row <= rows - 4; row++) {
    for (let col = 3; col < cols; col++) {
      if (checkConsecutive([board[row][col], board[row + 1][col - 1], board[row + 2][col - 2], board[row + 3][col - 3]], 1) || checkConsecutive([board[row][col], board[row + 1][col - 1], board[row + 2][col - 2], board[row + 3][col - 3]], 2)) {
        return { hasWinner: true, column: col, row: row, winner: winningPlayer, direction: "diagonalNegative" };
      }
    }
  }

  return {hasWinner: false, row: 0, column: 0, winner : 0, direction: ""}; // No winner found
}
