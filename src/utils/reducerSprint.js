import actions from "./actions";

export const initialState = {
  truelyAnswers: [],
  falsyAnswers: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SPRINT_ANSWERS: {
      localStorage.setItem('SprintAnswers', action.payload);
      return {
        ...state,
        truelyAnswers: action.payload,
        falsyAnswers: action.payload,
      };
    }
  }
}
