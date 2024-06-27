import { createContextProvider } from "../../utils/context/ContextFactory";

export interface IUser {
  name: string;
  desc: string;
  account: string;
  tel: string;
  id: string;
  avatarUrl: string;
}
const defaultUserState: IUser = {
  name: "",
  desc: "",
  account: "",
  tel: "",
  id: "",
  avatarUrl: "",
};

export const { Context: UserContext, Provider: UserProvider } =
  createContextProvider<IUser>(defaultUserState);
