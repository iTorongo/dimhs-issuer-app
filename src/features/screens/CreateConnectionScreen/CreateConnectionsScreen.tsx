import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Space, Row, Col, QRCode } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  createConnectionInvitation,
  getConnections,
} from "../../../api/services";

const CreateConnectionScreen = () => {
  const [createdInvitation, setCreatedInvitation] = useState<any>();

  const createConnectionMutation = useMutation({
    mutationFn: (reqBody: any) => {
      return createConnectionInvitation(reqBody);
    },
    onSuccess: data => {
      console.log(data);
      setCreatedInvitation(data?.data);
    },
  });

  const createConnection = () => {
    createConnectionMutation.mutate({});
  };

  const tempInvitation = {
    "@type": "https://didcomm.org/connections/1.0/invitation",
    "@id": "5659c88c-2fd6-4242-b38c-ed3f676d6193",
    recipientKeys: ["59wLZZdQRcGSUbsvNFU4ZEiHCbtyEMYR4E4dd1DvzwSd"],
    serviceEndpoint:
      "http://ip172-18-0-33-cgfnavgsf2q000afl6gg-8040.direct.labs.play-with-docker.com",
    label: "acme.agent",
  };

  return (
    <div className="create-connection-container">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button
            type="primary"
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={() => createConnection()}
            loading={createConnectionMutation?.isLoading}
          >
            Create Connection Invitation
          </Button>
        </Col>
        <Col span={24}>
          <Space>
            {!!createdInvitation && (
              <Card
                title="Invitation Object"
                style={{ width: 600, marginTop: 16 }}
                loading={createConnectionMutation?.isLoading}
              >
                <pre>{JSON.stringify(createdInvitation)}</pre>
              </Card>
            )}
          </Space>
        </Col>
        <Col>
          <Card title="Scan QR Code">
            <QRCode value={createdInvitation?.invitation_url} />
            <QRCode value={JSON.stringify(tempInvitation)} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateConnectionScreen;
