import { createContextProvider } from "../../utils/context/ContextFactory";

export interface IUser {
  name: string;
  desc: string;
  account: string;
}
const defaultUserState: IUser = {
  name: "",
  desc: "",
  account: "",
};

export const { Context: UserContext, Provider: UserProvider } =
  createContextProvider<IUser>(defaultUserState);
