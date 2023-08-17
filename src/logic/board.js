import { WINNER_COMBINATIONS } from '../constants';

export const checkWinnerFrom = (boardToCheck) => {
  for (const combination of WINNER_COMBINATIONS) {
    const [a, b, c] = combination;

    if (
      boardToCheck[a] && // x or o
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]; // x or o
    }
  }
  return null;
};

export const checkEndGame = (newBoard) => {
  //  Check no more emty spaces
  return newBoard.every((square) => square !== null); //true if no more spaces
};
