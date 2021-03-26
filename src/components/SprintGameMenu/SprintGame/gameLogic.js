export const pointsLogic = (
  randomTranslationWordIndex,
  currentWordIndex,
  boolean,
  pointsStrick,
) => {
  let plusPoints = 0;
  let strick = pointsStrick;
  if (randomTranslationWordIndex !== currentWordIndex) {
    if (boolean) {
      plusPoints = 0;
      strick = 0;
    } else {
      plusPoints = 10;
      strick += 1;
    }
  } else {
    if (boolean) {
      plusPoints = 10;
      strick += 1;
    } else {
      plusPoints = 0;
      strick = 0;
    }
  }
  return [plusPoints, strick];
};

export const getRandomTranslationWordIndex = () => {
  const randomTranslationIndex = Math.floor(Math.random() * Math.floor(20));
  return randomTranslationIndex;
};

export const getTruelyTranslationIndex = (currentWordIndex) => {
  const truelyTranslationIndex = currentWordIndex < 19 ? currentWordIndex + 1 : 0;
  return truelyTranslationIndex;
};

export const getCurrentWord = (words, isWordTranslate, index) => {
  const currentWord = words[index][isWordTranslate];
  return currentWord;
};

export function checkInputForm(state) {
  const errors = {};
  if (state.levelSettings > 6) {
    errors.levels = 'Oh, sorry, we have only 6 levels';
  }
  if (state.pageSettings > 30) {
    errors.pages = 'Oh, sorry, we have only 30 pages';
  }

  return {
    isValid: !Object.keys(errors).length,
    errors,
  };
}
