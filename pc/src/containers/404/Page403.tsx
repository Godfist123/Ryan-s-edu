import React, { useEffect } from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";

const Page403: React.FC = () => {
  const Navi = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      Navi("/login");
    }, 2000);
    return () => clearInterval(timer);
  }, [Navi]);
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
    />
  );
};

export default Page403;
