import React, { useEffect, useState } from "react";
import { setActualWords } from "../../utils/games/setActualWords";
import Difficulty from "../Difficulty/Difficulty";
import { useSelector } from "react-redux";
import AudioChallenge from "./AudioChallenge";
import { initialGameState, isGameOver } from "./audioChallenge.util";
import { shuffle } from "../../utils/games/arrShuffle";
import { getRand } from "../../utils/games/getRand";
import {
  BASE_URL,
  submitGameResult,
  submitRightAnswer,
  submitWrongAnswer,
} from "../../utils/api/api";
import audio from "../../assets/audio/correct.mp3";

const GameStats = ({ rightAnswers, wrongAnswers, rightAnswersStreak }) => {
  return (
    <div className="game-stats">
      <div className="game-stats_words">
        <div className="game-stats_words-column">
          <p>right answers</p>
          {rightAnswers.map((answer, i) => (
            <div key={i}>{answer.word}</div>
          ))}
        </div>
        <div className="game-stats_words-column">
          <p>wrong answers</p>
          {wrongAnswers.map((answer, i) => (
            <div key={i}>{answer.word}</div>
          ))}
        </div>
      </div>
      <div className="game-stats_streak">
        <p>right answers streak</p>
        {rightAnswersStreak}
      </div>
    </div>
  );
};

const GameStart = ({ startGame }) => {
  return (
    <div className="game-start">
      <h2>Аудиовызов</h2>
      <p>Тренировка улучшает восприятие речи на слух.</p>
      <button className="game-start_btn" onClick={startGame}>
        Начать
      </button>
    </div>
  );
};

const AudioChallengeContainer = ({ pageWords, group, page = 0 }) => {
  const audios = [new Audio(audio)];
  const { user } = useSelector((state) => state);
  const [gameState, setGameState] = useState(initialGameState);
  const [words, setWords] = useState(null);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isGameStartOpen, setIsGameStartOpen] = useState(true);
  const [isGameStatsOpen, setIsGameStatsOpen] = useState(false);

  const closeGameStart = () => {
    setIsGameStartOpen(false);
  };

  const setDifficulty = (difficulty = 0) => {
    setGameState({ ...gameState, difficulty });
    setIsDiffOpen(false);
    setIsGameOpen(true);
  };

  const openDiff = () => {
    if (!pageWords) {
      setIsDiffOpen(true);
    } else {
      setIsGameOpen(true);
    }
  };

  const startGame = () => {
    closeGameStart();
    openDiff();
  };

  const stopGame = () => {
    setIsGameOpen(false);
    setIsGameStatsOpen(true);
  };

  const goNextWord = () => {
    const iteration = gameState.iteration + 1;
    const mistakes = gameState.mistakes;
    if (isGameOver(iteration, mistakes, words, stopGame)) {
      submitGameResult(
        user.userId,
        "audioChallenge",
        gameState.rightAnswersStreak,
        gameState.rightAnswers.length,
        gameState.wrongAnswers.length
      );
      return;
    }
    const word = words[iteration];
    const audio = new Audio(BASE_URL + word.audio);
    audio.autoplay = true;
    setGameState({
      ...gameState,
      iteration,
      mistakes,
      word,
      audio,
      ansOptions: shuffle([...word.fakeTranslates, word.wordTranslate]),
      userAnswer: null,
      isGamePaused: false,
    });
  };

  const play = () => {
    gameState.audio.play();
  };
  const handleAns = (word) => {
    if (!gameState.isGamePaused) {
      let mistakes = gameState.mistakes;
      const newGameState = { ...gameState, userAnswer: word, isGamePaused: true };
      let currentRightAnswersStreak = gameState.currentRightAnswersStreak;

      let rightAnswersStreak = gameState.rightAnswersStreak;
      if (word === gameState.word.wordTranslate) {
        audios[0].play();
        const rightAnswers = [...gameState.rightAnswers];
        rightAnswers.push(gameState.word);
        currentRightAnswersStreak++;
        if (currentRightAnswersStreak > rightAnswersStreak) {
          rightAnswersStreak = currentRightAnswersStreak;
        }
        setGameState({
          ...newGameState,
          currentRightAnswersStreak,
          rightAnswersStreak,
          rightAnswers,
        });
        submitRightAnswer(user.userId, gameState.word._id);
      } else {
        // audios[1].play();

        currentRightAnswersStreak = 0;
        const wrongAnswers = [...gameState.wrongAnswers];
        wrongAnswers.push(gameState.word);
        mistakes++;
        setGameState({ ...newGameState, mistakes, currentRightAnswersStreak, wrongAnswers });
        submitWrongAnswer(user.userId, gameState.word._id);
      }
    }
  };

  useEffect(() => {
    if (words) {
      const word = words[gameState.iteration];
      const audio = new Audio(BASE_URL + word.audio);
      audio.autoplay = true;
      setGameState({
        ...gameState,
        word,
        ansOptions: shuffle([...word.fakeTranslates, word.wordTranslate]),
        audio,
      });
    }
  }, [words]);

  useEffect(() => {
    if (isGameOpen) {
      setActualWords(
        user.userId,
        setWords,
        gameState.difficulty || group,
        null,
        getRand(10),
        10,
        5
      );
    }
  }, [isGameOpen]);

  return (
    <>
      {isGameStartOpen && <GameStart startGame={startGame} />}
      {isDiffOpen && <Difficulty setDifficulty={setDifficulty} />}
      {isGameOpen && gameState.word && (
        <AudioChallenge
          gameState={gameState}
          handleAns={handleAns}
          goNextWord={goNextWord}
          play={play}
        />
      )}
      {isGameStatsOpen && (
        <GameStats
          rightAnswers={gameState.rightAnswers}
          wrongAnswers={gameState.wrongAnswers}
          rightAnswersStreak={gameState.rightAnswersStreak}
        />
      )}
    </>
  );
};

export default AudioChallengeContainer;
