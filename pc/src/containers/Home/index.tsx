/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import withUser, {
  WithUserDataProps,
} from "../../utils/context/WithUserContext";
import Page403 from "../404/Page403";
import { useGetUserByToken } from "../../hooks/useGetUserByToken";
import Loading from "../common/Loading";
import { useTitle } from "../../hooks/useTitle";

interface HomeProps extends WithUserDataProps {
  // Define your props here
}

const Home: React.FC<HomeProps> = (props) => {
  const { data, loading, error } = useGetUserByToken(props);
  useTitle("Home");

  if (error) {
    return <Page403 />;
  }

  // Render loading component while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Render data if available
  return data ? <div>{data.name}</div> : <Loading />;
};

export default withUser(Home);
