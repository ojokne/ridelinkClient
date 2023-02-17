import { ACTIONS } from "./actions";

export const orderReducer = (state, payload) => {
  switch (payload.type) {
    case ACTIONS.ADD_ORDERS: {
      return [...state, ...payload.orders];
    }
    case ACTIONS.CLEAR_ORDERS: {
      return [];
    }
    default:
      return state;
  }
};
