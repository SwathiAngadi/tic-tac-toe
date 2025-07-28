import { useState } from "react";
import "./App.css";
import Confetti from "react-confetti";

export default function App() {
  const [displayArray, setDisplayArray] = useState(new Array(9).fill(null));
  const [isNextX, setNext] = useState(false);
  //const [value, setValue] = useState("0");

  const winner = decalreWinner();
  function handleClick(id) {
    if (displayArray[id] || decalreWinner()) {
      return;
    }
    const nextSquare = displayArray.slice();
    if (isNextX === true) {
      nextSquare[id] = "X";
    } else {
      nextSquare[id] = "O";
    }
    setDisplayArray(nextSquare);
    setNext(!isNextX);
  }
  function decalreWinner() {
    const WinningFormat = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];
    for (var i = 0; i < WinningFormat.length - 1; i++) {
      const [a, b, c] = WinningFormat[i];
      if (
        displayArray[a] &&
        displayArray[a] === displayArray[b] &&
        displayArray[b] === displayArray[c]
      ) {
        return displayArray[a];
      }
    }
  }
  function displayAction() {
    if (winner) {
      return `Winner ${winner}`;
    } else {
      return `Next Player: ${isNextX ? "X" : "O"}`;
    }
  }
  function displayBoard() {
    return displayArray.map((item, index) => (
      <button className="btn" key={index} onClick={() => handleClick(index)}>
        {item}
      </button>
    ));
  }
  function handleReset() {
    setDisplayArray(new Array(9).fill(null));
    setNext(false);
  }

  return (
    <>
      {winner && <Confetti />}
      <h2> Tic Tac Toe</h2>
      <h5>{displayAction()} </h5>
      <div className="board">{displayBoard()}</div>
      <button className="reset" onClick={handleReset}>
        {" "}
        Reset
      </button>
    </>
  );
}
