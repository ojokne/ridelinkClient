import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "./dataReducer";
import { quoteReducer } from "./quoteReducer";

const QuoteContext = createContext();
const DataContext = createContext();

export const StateProvider = ({ children }) => {
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
    <QuoteContext.Provider value={{ quote, quoteDispatch }}>
      <DataContext.Provider value={{ data, dataDispatch }}>
        {children}
      </DataContext.Provider>
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  return useContext(QuoteContext);
};

export const useData = () => {
  return useContext(DataContext);
};
