import React, { createContext, useContext, useReducer } from "react";

export const StateContaxt = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContaxt.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContaxt.Provider>
);

export const useStateValue = () => useContext(StateContaxt);
