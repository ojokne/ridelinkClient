import { createContext, useContext, useReducer } from "react";
import { orderReducer } from "./orderReducer";
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

  const [orders, ordersDispatch] = useReducer(orderReducer, {});
  return (
    <QuoteContext.Provider value={{ quote, quoteDispatch }}>
      <DataContext.Provider value={{ orders, ordersDispatch }}>
        {children}
      </DataContext.Provider>
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  return useContext(QuoteContext);
};

export const useOrders = () => {
  return useContext(DataContext);
};
