import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Page404Props {
  // Define your props here
}

const Page404: React.FC<Page404Props> = (props) => {
  const navi = useNavigate();
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
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

export default Page404;
