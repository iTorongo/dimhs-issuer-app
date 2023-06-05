import { Card, Image } from "antd";
import Title from "antd/es/typography/Title";
import CreateConnectionScreen from "../../../dashboard/screens/CreateConnectionScreen/CreateConnectionScreen";
import image from "../../../../assets/scan-connect.png";
import imageHospital from "../../../../assets/hospital.jpg";

const ConnectScreens = () => {
  return (
    <div>
      <Card style={{ width: 850 }}>
        <Title level={2}>
          Connect with Government for National Identity Credentials
        </Title>
        <CreateConnectionScreen isPublic />
      </Card>
      <div className="d-flex justify-content-center">
        <Image width={550} preview={false} src={image} />
      </div>
    </div>
  );
};
export default ConnectScreens;
