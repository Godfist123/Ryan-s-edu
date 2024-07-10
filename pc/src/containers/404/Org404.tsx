import { Button, Result } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import withUser, {
  WithUserDataProps,
} from "../../utils/context/WithUserContext";

interface Org404Props extends WithUserDataProps {
  // Define your props here
}

const Org404: React.FC<Org404Props> = (props) => {
  const { userData } = props;
  const navi = useNavigate();
  useEffect(() => {
    if (userData.currentOrg) {
      navi("/");
    }
  }, [userData.currentOrg]);
  return (
    <div>
      <Result
        status="404"
        title="Please select an organization."
        subTitle="All users must be associated with an organization to access this page"
        extra={
          <Button
            type="primary"
            onClick={() => {
              navi("/");
            }}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default withUser(Org404);
