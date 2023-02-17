import { ACTIONS } from "./actions";

export const authReducer = (state, payload) => {
  switch (payload.type) {
    case ACTIONS.AUTHENTICATE: {
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        id: payload.id,
      };
    }
    case ACTIONS.LOGOUT: {
      return { ...state, isAuthenticated: false, id: "" };
    }
    case ACTIONS.CHANGE_ROLE: {
      return { ...state, role: payload.role };
    }
    default:
      return state;
  }
};
