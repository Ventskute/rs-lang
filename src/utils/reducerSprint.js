import actions from "./actions";

export const initialState = {
  truelyAnswers: [],
  falsyAnswers: [],
};

export default function sprintReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SPRINT_ANSWERS: {
      return {
        ...state,
        truelyAnswers: action.payload.truely,
        falsyAnswers: action.payload.falsy,
        sprintPoints: action.payload.points
      };
    }
    default:
      return state;
  }
}
