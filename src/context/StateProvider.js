import { createContext, useContext, useReducer } from "react";
import { authReducer } from "./authReducer";
import { orderReducer } from "./orderReducer";
import { quoteReducer } from "./quoteReducer";

const AuthenticationContext = createContext();
const QuoteContext = createContext();
const OrderContext = createContext();

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

  const [orders, ordersDispatch] = useReducer(orderReducer, [
    {
      id: "",
      isConfirmed: "",
      isCancelled: "",
      isInvoiceSent: 0,
      deliveryInstructions: "",
      amountQuoted: 0,
      amountPaid: 0,
      pickupLocation: "",
      deliveryLocation: "",
      productName: "",
      productWeight: 0,
      proposedScheduleDate: "",
      clientId: 0,
      trip: null,
    },
  ]);
  return (
    <AuthenticationContext.Provider value={{ auth, authDispatch }}>
      <QuoteContext.Provider value={{ quote, quoteDispatch }}>
        <OrderContext.Provider value={{ orders, ordersDispatch }}>
          {children}
        </OrderContext.Provider>
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

export const useOrders = () => {
  return useContext(OrderContext);
};
