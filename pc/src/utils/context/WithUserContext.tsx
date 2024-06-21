import { useContext, ComponentType } from "react";
import { IUser, UserContext } from "./UserContext";

// Define the types for the additional props that will be injected into the component
export interface WithUserDataProps {
  userData: IUser;
  setUserData: (data: Partial<IUser>) => void;
}

function withUser<T extends WithUserDataProps = WithUserDataProps>(
  Component: ComponentType<T>
): ComponentType<Omit<T, keyof WithUserDataProps>> {
  const WrappedComponent: ComponentType<Omit<T, keyof WithUserDataProps>> = (
    props
  ) => {
    const [userData, setUserData] = useContext(UserContext);

    // Prepare the injected props
    const injectedProps = {
      userData,
      setUserData,
    } as WithUserDataProps;

    return <Component {...(props as T)} {...injectedProps} />;
  };

  return WrappedComponent;
}

export default withUser;
