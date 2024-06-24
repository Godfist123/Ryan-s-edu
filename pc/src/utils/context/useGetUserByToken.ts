import { useQuery } from "@apollo/client";
import { getUserByToken } from "../../graphql/auth";
import { AUTH_TOKEN } from "../constants";

export function useGetUserByToken(props: any) {
  const token = localStorage.getItem(AUTH_TOKEN);

  const { data, loading, error } = useQuery(getUserByToken, {
    variables: { token },
    skip: !token, // Ensures query doesn't run if no token is available
    fetchPolicy: "cache-and-network", // Ensures data is fresh
  });

  if (props && props.userData && props.userData.name !== "") {
    console.log("Using data from props:", props.userData);
    return {
      data: props.userData,
      loading: false,
      error: null,
    };
  }

  // Handle Apollo results
  if (data && data.getUserByToken) {
    console.log("Using data from Apollo query:", data.getUserByToken.data);
    return {
      data: data.getUserByToken.data,
      loading,
      error: error ? error.message : null,
    };
  }

  if (loading) {
    return { data: null, loading: true, error: null };
  }

  if (error) {
    console.log("Error fetching data:", error.message);
    return { data: null, loading: false, error: error.message };
  }

  console.log("No data available");
  return {
    data: null,
    loading: false,
    error: "No data available",
  };
}
