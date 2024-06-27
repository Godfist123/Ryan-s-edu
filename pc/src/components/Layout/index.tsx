import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutlet } from "react-router-dom";
import styles from "./index.module.scss";
import { useGetUserByToken } from "../../hooks/useGetUserByToken";
import withUser from "../../utils/context/WithUserContext";
import { HomeOutlined } from "@ant-design/icons";
import { AUTH_TOKEN } from "../../utils/constants";
import { routes } from "../../routes";

interface LayoutProps {
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
        onClick: logout,
      }}
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
      menuItemRender={menuItemRender}
    >
      {outlet}
    </ProLayout>
  );
};

export default withUser(Layout);
