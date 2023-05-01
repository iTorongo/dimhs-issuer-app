import { Card, Image } from "antd";
import Title from "antd/es/typography/Title";
import CreateConnectionScreen from "../../../dashboard/screens/CreateConnectionScreen/CreateConnectionScreen";
import image from "../../../../assets/scan-connect-user.jpg";

const ConnectScreens = () => {
  return (
    <div>
      <Card style={{ width: 850 }}>
        <Title level={2}>
          Connect with Government for National Identity Credentials
        </Title>
        <CreateConnectionScreen isPublic />
      </Card>
      <Image width={850} preview={false} src={image} />
    </div>
  );
};
export default ConnectScreens;
