// src/contexts/UserContext.js
import { createContextProvider } from "../../utils/context/ContextFactory";

const defaultUserState = {
  user: null,
};

export const { Context: UserContext, Provider: UserProvider } =
  createContextProvider(defaultUserState);
