import { Avatar, Dropdown, Layout, Menu, MenuProps, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
  BankOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const { Header, Sider, Content } = Layout;

const ContentLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="content-layout">
      <Header className="header-container">
        <div>DIMHS</div>
        <div className="d-flex align-items-center">
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<BankOutlined />}
          />
          <span>Issuer</span>
        </div>
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {/* <div className="sidebar-trigger">
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
            ) : (
              <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
            )}
          </div> */}
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="home">
              <NavLink to="/">
                <HomeOutlined className="me-2" />
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key="connections">
              <NavLink to="/connections">
                <TeamOutlined className="me-2" />
                Connections
              </NavLink>
            </Menu.Item>
            <Menu.Item key="credential-schemas">
              <NavLink to="/credential-schemas">
                <TeamOutlined className="me-2" />
                Credential Schemas
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default ContentLayout;

interface Props {
  children: ReactNode;
}
