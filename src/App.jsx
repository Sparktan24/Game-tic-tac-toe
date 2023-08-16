import { useState } from 'react';
import Square from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { TURNS } from './constants';
import { checkWinnerFrom } from './logic/board';
import confetti from 'canvas-confetti';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); //Null not winner, false draw

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null); //Null not winner, false draw
  };

  const checkEndGame = (newBoard) => {
    //  Check no more emty spaces
    return newBoard.every((square) => square !== null); //true if no more spaces
  };

  const updateBoard = (index) => {
    //  console.log(winner);
    if (board[index] || winner) return;
    //  UPDATE BOARD
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //  CHANGE TURN
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //  CHECK FOR A WINNER
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //  DRAW
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
