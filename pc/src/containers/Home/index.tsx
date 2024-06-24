/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import withUser, {
  WithUserDataProps,
} from "../../utils/context/WithUserContext";
import Page403 from "../404/Page403";
import { useGetUserByToken } from "../../utils/context/useGetUserByToken";
import Loading from "../common/Loading";

interface HomeProps extends WithUserDataProps {
  // Define your props here
}

const Home: React.FC<HomeProps> = (props) => {
  const { data, loading, error } = useGetUserByToken(props);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Page403 />;
  }
  return <div>{data.name}</div>;
};

export default withUser(Home);
