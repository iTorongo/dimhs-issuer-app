import { Card } from "antd";
import Title from "antd/es/typography/Title";
import CreateConnectionScreen from "../../../dashboard/screens/CreateConnectionScreen/CreateConnectionScreen";

const ConnectScreens = () => {
  return (
    <Card style={{ width: 850 }}>
      <Title level={2}>
        Connect with Government for National Identity Credentials
      </Title>
      <CreateConnectionScreen isPublic />
    </Card>
  );
};
export default ConnectScreens;
