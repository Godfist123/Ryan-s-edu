import React, { useContext } from "react";
import { StoreContext } from "../../utils/context/StoreContext";
import { Button } from "antd";

interface TestProps {
  // Define your props here
}

const Test: React.FC<TestProps> = (props) => {
  const { store, setStore } = useContext(StoreContext);
  return (
    <div>
      {JSON.stringify(store)}
      <Button onClick={() => setStore({ "123": "123" })}>Click me</Button>
    </div>
  );
};

export default Test;
