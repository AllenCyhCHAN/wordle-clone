import React, { useContext, useEffect } from "react";

import { AppContext } from "../App";

const Letter = ({ letterPos, attempVal }) => {
  const {
    board,
    correctWord,
    currAttempt,
    setDisabledLetters,
    theme,
    setAlmostWords,
    setCorrectWords,
  } = useContext(AppContext);
  const letter = board[attempVal][letterPos];

  const correct = correctWord[letterPos] === letter.toLowerCase();

  const almost =
    correctWord.includes(letter.toLowerCase()) && !correct && letter !== "";

  const letterState =
    currAttempt.attempt > attempVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => {
        return [...prev, letter];
      });
    }

    if (correct) {
      setCorrectWords((prev) => {
        return [...prev, letter];
      });
    }

    if (almost) {
      setAlmostWords((prev) => {
        return [...prev, letter];
      });
    }
  }, [currAttempt.attempt]);

  return (
    <div className={theme ? "letter dark" : "letter light "} id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
