import React, { useEffect, useCallback, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const {
    onSelectLetter,
    onDeleteLetter,
    onEnterLetter,
    disabledLetters,
    almostWords,
    correctWords,
  } = useContext(AppContext);

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnterLetter();
    } else if (event.key === "Backspace") {
      onDeleteLetter();
    } else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line">
        {keys1.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              disabled={disabledLetters.includes(key)}
              almost={almostWords.includes(key)}
              correct={correctWords.includes(key)}
            />
          );
        })}
      </div>
      <div className="line">
        {keys2.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              disabled={disabledLetters.includes(key)}
              almost={almostWords.includes(key)}
              correct={correctWords.includes(key)}
            />
          );
        })}
      </div>
      <div className="line">
        <Key keyVal={"ENTER"} bigKey={true} />
        {keys3.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              disabled={disabledLetters.includes(key)}
              almost={almostWords.includes(key)}
              correct={correctWords.includes(key)}
            />
          );
        })}
        <Key keyVal={"DELETE"} bigKey={true} />
      </div>
    </div>
  );
};

export default Keyboard;
