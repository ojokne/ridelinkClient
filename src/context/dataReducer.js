import { ACTIONS } from "./actions";

export const dataReducer = (state, payload) => {
  switch (payload.type) {
    case ACTIONS.ADD_ORDERS: {
      return { ...state, data: payload.orders };
    }
    case ACTIONS.CLEAR_ORDERS: {
      return {};
    }
    default:
      return state;
  }
};
