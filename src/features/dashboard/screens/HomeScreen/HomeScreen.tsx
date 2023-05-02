/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "antd";

const { Title } = Typography;

const HomeScreen = () => {
  return (
    <div className="d-flex">
      <Title level={2}>Welcome to Government Issuer Dashboard</Title>
    </div>
  );
};

export default HomeScreen;
