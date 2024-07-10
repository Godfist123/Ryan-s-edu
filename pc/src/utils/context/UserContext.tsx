import { createContextProvider } from "../../utils/context/ContextFactory";

export interface IUser {
  name: string;
  desc: string;
  account: string;
  tel: string;
  id: string;
  avatarUrl: string;
  [key: string]: any;
}
const defaultUserState: IUser = {
  name: "",
  desc: "",
  account: "",
  tel: "",
  id: "",
  avatarUrl: "",
  currentOrg: "",
};

export const { Context: UserContext, Provider: UserProvider } =
  createContextProvider<IUser>(defaultUserState);
