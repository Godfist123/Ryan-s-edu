import { HomeOutlined } from "@ant-design/icons";
import Home from "../containers/Home";
import TestWithUser from "../containers/Test";
import Page404 from "../containers/404/Page404";
import Info from "../containers/Info";

interface IRoute {
  path: string;
  element: () => JSX.Element;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: "home",
  TEST: "test",
  PAGE404: "404",
  INFO: "info",
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: "/home",
    element: () => <Home />,
    name: "Home",
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.TEST]: {
    path: "/test",
    element: () => <TestWithUser />,
    name: "Test",
    icon: <HomeOutlined />,
  },

  [ROUTE_KEY.INFO]: {
    path: "/info",
    element: () => <Info />,
    name: "Info",
    icon: <HomeOutlined />,
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ROUTE_CONFIG[key]);
