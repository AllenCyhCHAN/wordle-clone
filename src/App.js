import "./App.css";

import { useState, createContext, useEffect } from "react";

import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import { boardDefault, generateWordSet } from "./components/Words";
import { generateRandomWord } from "./components/WordBank";

export const AppContext = createContext(null);

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [almostWords, setAlmostWords] = useState([]);
  const [applicableWord, setApplicableWord] = useState(true);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [theme, setTheme] = useState(true);

  const toggleTheme = () => {
    setTheme((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    const wordSet = generateWordSet();
    const correctWord = generateRandomWord();
    setCorrectWord(correctWord);
    setWordSet(wordSet);
  }, []);


  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letterPos: currAttempt.letterPos + 1,
    });
  };

  const onDeleteLetter = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letterPos: currAttempt.letterPos - 1,
    });
  };

  const onEnterLetter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
      setApplicableWord(true);
    } else {
      setApplicableWord(false);
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setApplicableWord(true);
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setApplicableWord(true);
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  return (
    <div className={theme ? "App-dark" : "App-light"}>
      <nav>
        <h1 className={theme ? "title title-dark" : "title title-light"}>
          Weirdo
        </h1>
        <button
          className={theme ? "dark-btn color-btn" : "light-btn color-btn"}
          onClick={toggleTheme}
        >
          {!theme ? "dark" : "light"}
        </button>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onDeleteLetter,
          onSelectLetter,
          onEnterLetter,
          correctWord,
          setDisabledLetters,
          disabledLetters,
          gameOver,
          setGameOver,
          theme,
          almostWords,
          setAlmostWords,
          correctWords,
          setCorrectWords,
        }}
      >
        <div className="game">
          <Board />
          {applicableWord ? <h1 /> : <h1>Invalid Word</h1>}
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
