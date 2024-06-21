import React, { useContext, useEffect } from "react";
import { Button } from "antd";
import { UserContext } from "../../utils/context/UserContext";
import { useQuery } from "@apollo/client";
import { getUserByTel } from "../../graphql/auth";
import withUser, {
  WithUserDataProps,
} from "../../utils/context/WithUserContext";

interface TestProps extends WithUserDataProps {
  // Define your props here
}

const Test: React.FC<TestProps> = ({ userData, setUserData }) => {
  const { data } = useQuery(getUserByTel, {
    variables: { tel: "15541581047" },
  });

  return (
    <div>
      {JSON.stringify(userData)}
      <Button
        onClick={() =>
          setUserData({ name: "test", desc: "test", account: "test" })
        }
      >
        Click me
      </Button>
    </div>
  );
};

const TestWithUser = withUser(Test);
export default TestWithUser;
