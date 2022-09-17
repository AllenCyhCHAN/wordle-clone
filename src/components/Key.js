import React, { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, disabled, correct, almost }) => {
  const { onSelectLetter, onDeleteLetter, onEnterLetter } =
    useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnterLetter();
    } else if (keyVal === "DELETE") {
      onDeleteLetter();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    <div
      className="key"
      id={
        bigKey === true
          ? "big"
          : disabled
          ? "disabled"
          : correct
          ? "correct"
          : almost
          ? "almost"
          : ""
      }
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
};

export default Key;
