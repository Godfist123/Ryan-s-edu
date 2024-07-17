import { MenuDataItem, ProLayout } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useOutlet } from "react-router-dom";
import styles from "./index.module.scss";
import { useGetUserByToken } from "../../hooks/useGetUserByToken";
import withUser, {
  WithUserDataProps,
} from "../../utils/context/WithUserContext";
import { LogoutOutlined, ShopOutlined } from "@ant-design/icons";
import { AUTH_TOKEN } from "../../utils/constants";
import { routes } from "../../routes";
import { Space, Tooltip } from "antd";
import OrgSelector from "../OrgSelect";

interface LayoutProps extends WithUserDataProps {
  // Define your props here
}

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => {
  return <Link to={item.path || "/"}>{dom}</Link>;
};

const Layout: React.FC<LayoutProps> = (props) => {
  const outlet = useOutlet();
  const { data } = useGetUserByToken(props);
  const Navi = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const location = useLocation();

  useEffect(() => {
    if (data?.avatarUrl) {
      setAvatarUrl(`http://localhost:3000/aws/publicfile/${data.avatarUrl}`);
      console.log(`http://localhost:3000/aws/publicfile/${data.avatarUrl}`);
    } else {
      setAvatarUrl(
        "http://localhost:3000/aws/publicfile/edu-user-avatar%2Fdefault.jpg"
      );
    }
  }, [data?.avatarUrl]);

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    Navi("/login");
  };
  return (
    <ProLayout
      layout="mix"
      className={styles.container}
      avatarProps={{
        src: avatarUrl,
        title: data?.name,
        size: "large",
        onClick: () => {
          Navi("/info");
        },
      }}
      links={[
        <Space size={20} onClick={logout}>
          <LogoutOutlined />
          Log Out
        </Space>,
      ]}
      logo={
        <img
          src="http://localhost:3000/aws/publicfile/edu-assets%2Ficon.jpg"
          alt="Logo"
        />
      }
      title="Ryan's Edu"
      route={{
        path: "/",
        routes: routes,
      }}
      onMenuHeaderClick={() => {
        Navi("/home");
      }}
      actionsRender={() => [
        location.pathname !== "/org" && <OrgSelector />,
        <Tooltip title="Org Management">
          <ShopOutlined
            onClick={() => {
              Navi("/org");
            }}
          />
        </Tooltip>,
      ]}
      menuItemRender={menuItemRender}
    >
      <div key={props.userData.currentOrg}>{outlet}</div>
    </ProLayout>
  );
};

export default withUser(Layout);
