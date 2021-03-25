export const pointsLogic = (randomTranslationWordIndex, currentWordIndex, boolean, pointsStrick) => {
  let plusPoints = 0;
  let strick = pointsStrick;
  console.log(boolean, 'boolean')
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
