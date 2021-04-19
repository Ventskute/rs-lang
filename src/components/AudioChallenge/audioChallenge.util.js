export const initialGameState = {
  iteration: 0,
  mistakes: 0,
  word: null,
  difficulty: null,
  userAnswer: null,
  ansOptions: null,
  isGamePaused: false,
  audio: null,
  rightAnswersStreak: 0,
  currentRightAnswersStreak: 0,
  rightAnswers: [],
  wrongAnswers: [],
};

export const isGameOver = (iteration, mistakes, words, stopGame) => {
  if (words) {
    if (mistakes >= 5) {
      stopGame();
      return true;
    }
    if (iteration >= words.length) {
      stopGame();
      return true;
    }
    return false;
  }
};
