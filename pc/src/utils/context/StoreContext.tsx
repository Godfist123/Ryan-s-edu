/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface IStore {
  key?: string;
  store: Record<string, any>;
  setStore: (payload: Record<string, any>) => void;
}

// Default values or initial state can be provided here
const defaultState: IStore = {
  store: {},
  setStore: () => {}, // Placeholder function
};

const StoreContext = React.createContext<IStore>(defaultState);

export { StoreContext };
