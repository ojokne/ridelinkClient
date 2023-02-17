import { ACTIONS } from "./actions";

export const quoteReducer = (state, payload) => {
  switch (payload.type) {
    case ACTIONS.ADD_QUOTE: {
      return { ...state, ...payload.quote };
    }
    case ACTIONS.CLEAR_QUOTE: {
      return {};
    }

    default:
      return state;
  }
};
