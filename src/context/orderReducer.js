import { ACTIONS } from "./actions";

export const orderReducer = (state, payload) => {
  switch (payload.type) {
    case ACTIONS.ADD_ORDERS: {
      return { ...state, ...payload.orders };
    }
    default:
      return state;
  }
};
