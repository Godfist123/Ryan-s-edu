import React, { useContext, useEffect } from "react";
import { Button } from "antd";
import { UserContext } from "../../utils/context/UserContext";
import { useMutation, useQuery } from "@apollo/client";
import { getUserByTel, updateUser } from "../../graphql/auth";
import withUser, {
  WithUserDataProps,
} from "../../utils/context/WithUserContext";
import { useGetUserByToken } from "../../hooks/useGetUserByToken";

interface TestProps extends WithUserDataProps {
  // Define your props here
}

const Test: React.FC<TestProps> = (props) => {
  const { data } = useGetUserByToken(props);
  const [run] = useMutation(updateUser);

  return (
    <div>
      <Button
        onClick={() => {
          if (!data?.id) {
            alert("User data not available.");
            return;
          }
          console.log(data.id);
          run({
            variables: {
              id: data.id,
              params: {
                avatarUrl: "123",
              },
            },
          }).catch((error) => {
            console.error("Error running mutation:", error);
            alert("Failed to update user: " + error.message);
          });
        }}
      >
        Click me
      </Button>
    </div>
  );
};

const TestWithUser = withUser(Test);
export default TestWithUser;
