import React from "react";
import { Button } from "antd";

import withUser, {
  WithUserDataProps,
} from "../../utils/context/WithUserContext";

interface TestProps extends WithUserDataProps {
  // Define your props here
}

const Test: React.FC<TestProps> = (props) => {
  // const { data } = useGetUserByToken(props);
  // const [run] = useMutation(updateUser);

  return (
    <div>
      <Button
        onClick={() => {
          props.setUserData({ name: "Ryan" });
        }}
      >
        Click me
      </Button>
    </div>
  );
};

const TestWithUser = withUser(Test);
export default TestWithUser;
