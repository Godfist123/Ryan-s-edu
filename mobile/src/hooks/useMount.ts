import { useEffect } from "react";

const useMount = () => {
  useEffect(() => {
    console.log("A");
  }, []);
};

export default useMount;
