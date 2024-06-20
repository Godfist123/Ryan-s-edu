import React, {
  createContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Helper type for the updater function
type UpdaterFunction<T> = (prevState: T, payload: any) => T;

// Factory function to create a context and its provider
export function createContextProvider<T>(
  defaultState: T,
  updaterFn?: UpdaterFunction<T>
) {
  const Context = createContext<[T, Dispatch<SetStateAction<T>>]>([
    defaultState,
    () => {},
  ]);

  const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState(defaultState);

    // Creating a setter function that incorporates the updater logic
    const setMergedState = (payload: any) => {
      setState((prevState) =>
        updaterFn ? updaterFn(prevState, payload) : { ...prevState, ...payload }
      );
    };

    const contextValue = useMemo(
      () => [state, setMergedState] as [T, Dispatch<SetStateAction<T>>],
      [state]
    );

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  return { Context, Provider };
}
