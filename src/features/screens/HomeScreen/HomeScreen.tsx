/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from "react";
import { Typography } from "antd";

const { Title } = Typography;

const HomeScreen = () => {
  return (
    <div className="d-flex">
      <Title level={2}>Welcome Hospital Issuer</Title>
    </div>
  );
};

export default HomeScreen;
