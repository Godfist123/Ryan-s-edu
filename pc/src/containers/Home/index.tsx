/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import withUser, {
  WithUserDataProps,
} from "../../utils/context/WithUserContext";

interface HomeProps extends WithUserDataProps {
  // Define your props here
}

const Home: React.FC<HomeProps> = ({ userData }) => {
  return <div>{userData.name}</div>;
};

export default withUser(Home);
