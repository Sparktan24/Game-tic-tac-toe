import { useState } from 'react';

const TURNS = {
  X: 'x',
  O: 'o',
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBINATIONS = [
  //  HORIZONTAL
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //  VERTICAL
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //  DIAGONAL
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); //Null not winner, false draw

  const checkWinner = (boardToCheck) => {
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
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? 'Draw' : 'Winner'}</h2>

            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button>Restart</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
