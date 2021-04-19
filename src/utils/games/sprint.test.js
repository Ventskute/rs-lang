import {
    checkInputForm,
    getRandomTranslationWordIndex,
    getTruelyTranslationIndex,
    pointsLogic,
  } from './sprint';
  
  describe('Check Input form:', () => {
    let state = { levelSettings: 5, pageSettings: 10 };
  
    test('should return valid object with no errors', () => {
      state = { levelSettings: 5, pageSettings: 10 };
      expect(checkInputForm(state)).toStrictEqual({ isValid: true, errors: {} });
    });
  
    test('should return invalid object with level errors', () => {
      state.levelSettings = 7;
      state.pageSettings = 10;
      expect(checkInputForm(state)).toStrictEqual({
        isValid: false,
        errors: { levels: 'Oh, sorry, we have only 6 levels' },
      });
    });
  
    test('should return invalid object with pages errors', () => {
      state.levelSettings = 1;
      state.pageSettings = 40;
      expect(checkInputForm(state)).toStrictEqual({
        isValid: false,
        errors: { pages: 'Oh, sorry, we have only 30 pages' },
      });
    });
  });
  
  describe('Check random word index:', () => {
    let state = { levelSettings: 5, pageSettings: 10 };
  
    test('should return value greater  0 and less or equal 20', () => {
      expect(getRandomTranslationWordIndex()).toBeGreaterThan(0);
      expect(getRandomTranslationWordIndex()).toBeLessThanOrEqual(20);
    });
  });
  
  describe('Get truely translation index :', () => {
    test('should be ++value', () => {
      let index = 10;
      expect(getTruelyTranslationIndex(index)).toEqual(11);
    });
  
    test('should be 0', () => {
      let index = 19;
      expect(getTruelyTranslationIndex(index)).toEqual(0);
    });
  });
  
  describe('Points logic:', () => {
    let randomTranslationWordIndex = 10;
    let currentWordIndex = 11;
    let boolean = false;
    let pointsStrick = 0;
  
    test('should be plus points += 10 and points strick +=1', () => {
      expect(
        pointsLogic(randomTranslationWordIndex, currentWordIndex, boolean, pointsStrick),
      ).toEqual([10, 1]);
    });
  
    test('should be plus points +=0 and points strick +=0', () => {
      boolean = true;
      expect(
        pointsLogic(randomTranslationWordIndex, currentWordIndex, boolean, pointsStrick),
      ).toEqual([0, 0]);
    });
  
    test('should be plus points += 10 and points strick +=1', () => {
      currentWordIndex = randomTranslationWordIndex;
      expect(
        pointsLogic(randomTranslationWordIndex, currentWordIndex, boolean, pointsStrick),
      ).toEqual([10, 1]);
    });
  
    test('should be plus points += 0 and points strick +=0', () => {
      boolean = false;
      expect(
        pointsLogic(randomTranslationWordIndex, currentWordIndex, boolean, pointsStrick),
      ).toEqual([0, 0]);
    });
  });
  