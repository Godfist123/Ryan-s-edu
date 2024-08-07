import {
  BookOutlined,
  CheckOutlined,
  HomeOutlined,
  InfoOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import Home from "../containers/Home";
import TestWithUser from "../containers/Test";
import Info from "../containers/Info";
import Org from "../containers/Org";
import Org404 from "../containers/404/Org404";
import Course from "../containers/Course";

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
  ORG: "org",
  NOORG: "noorg",
  COURSE: "course",
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
    icon: <CheckOutlined />,
  },

  [ROUTE_KEY.INFO]: {
    path: "/info",
    element: () => <Info />,
    name: "Info",
    icon: <InfoOutlined />,
  },
  [ROUTE_KEY.ORG]: {
    path: "/org",
    element: () => <Org />,
    name: "Org",
    icon: <ShopOutlined />,
  },
  [ROUTE_KEY.NOORG]: {
    path: "/noorg",
    element: () => <Org404 />,
    name: "NoOrg",
    hideInMenu: true,
    icon: <ShopOutlined />,
  },
  [ROUTE_KEY.COURSE]: {
    path: "/course",
    element: () => <Course />,
    name: "course",
    icon: <BookOutlined />,
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ROUTE_CONFIG[key]);
