import React, { useEffect } from "react";
import "./AnswerOption.scss";

const AnswerOption = ({ word, handleAns, i, userAnswer, answer, reference }) => {
  let className = "";
  //!!!!!!!!!!!!!
  if (userAnswer) {
    if (userAnswer === word) {
      if (userAnswer === answer) {
        className = className.concat(" ansOption--correct");
      } else {
        className = className.concat(" ansOption--wrong");
      }
    }
    if (answer !== word) {
      className = className.concat(" ansOption--blur");
    }
  }

  const index = i + 1;

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (Number(e.key) === index) {
  //       e.preventDefault();
  //       handleAns(word);
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => document.removeEventListener("keydown", handleKeyDown);
  // }, []);

  return (
    <button ref={reference} onClick={() => handleAns(word)} className={`ansOption${className}`}>
      {index} {word}
    </button>
  );
};

export default AnswerOption;
