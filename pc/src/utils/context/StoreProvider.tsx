import { ReactNode, FC, useState, useMemo } from "react";
import { StoreContext } from "./StoreContext";

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [store, setStore] = useState<Record<string, any>>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateStore = (payload: Record<string, any>) => {
    setStore((prevStore) => ({ ...prevStore, ...payload }));
  };

  const value = useMemo(
    () => ({
      store,
      setStore: updateStore,
    }),
    [store]
  );
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
