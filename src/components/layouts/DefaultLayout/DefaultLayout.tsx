import { Layout } from "antd";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import "./styles.scss";

const { Header, Sider, Content } = Layout;

const DefaultLayout = () => {
  return (
    <Layout className="default-layout">
      <Layout>
        <Content className="container">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;

export interface Props {
  children?: ReactNode;
}
