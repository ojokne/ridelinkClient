import { createContext, useContext, useReducer } from "react";
import { authReducer } from "./authReducer";
import { dataReducer } from "./dataReducer";
import { quoteReducer } from "./quoteReducer";

const AuthenticationContext = createContext();
const QuoteContext = createContext();
const DataContext = createContext();

export const StateProvider = ({ children }) => {
  const [auth, authDispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    id: null,
  });

  const [quote, quoteDispatch] = useReducer(quoteReducer, {
    productName: "",
    productWeight: "",
    proposedScheduleDate: "",
    amountQuoted: 0,
    pickupLocation: "",
    deliveryLocation: "",
    deliveryInstructions: "",
  });

  const [data, dataDispatch] = useReducer(dataReducer, {});
  return (
    <AuthenticationContext.Provider value={{ auth, authDispatch }}>
      <QuoteContext.Provider value={{ quote, quoteDispatch }}>
        <DataContext.Provider value={{ data, dataDispatch }}>
          {children}
        </DataContext.Provider>
      </QuoteContext.Provider>
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

export const useQuote = () => {
  return useContext(QuoteContext);
};

export const useData = () => {
  return useContext(DataContext);
};
