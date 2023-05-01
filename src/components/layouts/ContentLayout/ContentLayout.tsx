import { ReactNode, useState } from "react";
import {
  BankOutlined,
  HomeOutlined,
  LinkOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  InsertRowBelowOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import "./styles.scss";

const { Header, Sider, Content } = Layout;

const ContentLayout = () => {
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
          <span className="ms-2">Issuer</span>
        </div>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          width={250}
        >
          {/* <div className="sidebar-trigger">
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
            ) : (
              <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
            )}
          </div> */}
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="home">
              <NavLink to="/">
                <HomeOutlined className="me-2" />
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key="connections">
              <NavLink to="/connections">
                <LinkOutlined className="me-2" />
                Connections
              </NavLink>
            </Menu.Item>
            <Menu.Item key="credential-schemas">
              <NavLink to="/credential-schemas">
                <InsertRowBelowOutlined className="me-2" />
                Credential Schemas
              </NavLink>
            </Menu.Item>
            <Menu.Item key="credential-definitions">
              <NavLink to="/credential-definitions">
                <FileTextOutlined className="me-2" />
                Credential Definitions
              </NavLink>
            </Menu.Item>
            <Menu.Item key="issue-credential">
              <NavLink to="/issue-credential">
                <FileDoneOutlined className="me-2" />
                Issue & Send Credential
              </NavLink>
            </Menu.Item>
            <Menu.Item key="issue-credentials">
              <NavLink to="/issue-credentials">
                <FileDoneOutlined className="me-2" />
                Issue Credentials
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContentLayout;

interface Props {
  children?: ReactNode;
}
