import { memo } from "react";

import { Layout, Row, Col } from "antd";
import cx from "classnames";

import styles from "./Navigation.module.scss";

const { Header, Sider } = Layout;

type NavigationProps = {
  sticky?: boolean;
  sidebar?: boolean;
};

const Navigation = memo(({ sidebar, sticky = false }: NavigationProps) => {
  if (sidebar) {
    return <Sider className={styles.sidebar}></Sider>;
  }
  return (
    <Header className={cx(styles.navbar, { [styles.sticky]: sticky })}>
      <Row>
        <Col md={18} lg={20} className={styles.navLeftContent}></Col>
        <Col md={6} lg={4} className={styles.navRightContent}></Col>
      </Row>
    </Header>
  );
});

export default Navigation;
