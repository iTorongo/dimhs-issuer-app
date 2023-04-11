import { PlusCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Space, Row, Col, QRCode, Empty, Alert } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, Navigate } from "react-router-dom";
import {
  createConnectionInvitation,
  getConnections,
} from "../../../../api/services";

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
    createConnectionMutation.mutate({
      metadata: {
        purpose: "dev",
        name: "Hospital",
      },
      my_label: "Faber Agent",
    });
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
          <div className="d-flex justify-content-between">
            <Button
              type="primary"
              size="large"
              icon={<PlusCircleOutlined />}
              onClick={() => createConnection()}
              loading={createConnectionMutation?.isLoading}
              className="mb-3"
            >
              Create Connection Invitation
            </Button>
            <Button className="m-2" type="default" icon={<ArrowLeftOutlined />}>
              <Link to="/connections">Back</Link>
            </Button>
          </div>

          {createdInvitation?.invitation_url && (
            <Alert
              message="Connection Invitation Created"
              type="success"
              showIcon
            />
          )}
        </Col>
        <Row gutter={[12, 12]}>
          <Col>
            {!!createdInvitation && (
              <Card
                title="Invitation Object"
                style={{ width: 600 }}
                loading={createConnectionMutation?.isLoading}
              >
                <pre>{JSON.stringify(createdInvitation, null, 2)}</pre>
              </Card>
            )}
          </Col>
          <Col>
            {createdInvitation?.invitation_url && (
              <Card title="Scan Invitation QR Code">
                <QRCode value={createdInvitation?.invitation_url} />
                {/* <QRCode value={JSON.stringify(tempInvitation)} /> */}
              </Card>
            )}
          </Col>
        </Row>

        <Col>
          {createdInvitation?.invitation_url ? (
            <Alert
              message="Copy Invitation URL"
              description={createdInvitation?.invitation_url}
              type="info"
              showIcon
            />
          ) : (
            <Empty description="No invitation" />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CreateConnectionScreen;
