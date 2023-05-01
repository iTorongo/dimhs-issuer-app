import { PlusCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Row, Col, QRCode, Empty, Alert, Typography } from "antd";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createConnectionInvitation } from "../../../../api/services";

const { Text } = Typography;

const CreateConnectionScreen = ({ isPublic = false }: Props) => {
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
        name: "Government",
      },
      my_label: "Government Agent",
      accept: "manual",
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
            {!createdInvitation && (
              <Button
                type="primary"
                size="large"
                icon={<PlusCircleOutlined />}
                onClick={() => createConnection()}
                loading={createConnectionMutation?.isLoading}
                className="mb-3"
              >
                {!isPublic
                  ? "Create Connection Invitation"
                  : "Request for Connection"}
              </Button>
            )}
            {!isPublic && (
              <Button
                className="m-2"
                type="default"
                icon={<ArrowLeftOutlined />}
              >
                <Link to="/connections">Back</Link>
              </Button>
            )}
          </div>

          {createdInvitation?.invitation_url && (
            <Alert
              message="Connection Invitation Created"
              type="success"
              showIcon
            />
          )}
        </Col>

        <Col span={24}>
          {!!createdInvitation && !isPublic && (
            <Card
              title="Invitation Object"
              loading={createConnectionMutation?.isLoading}
            >
              <pre>{JSON.stringify(createdInvitation, null, 2)}</pre>
            </Card>
          )}
        </Col>
        <Col span={24}>
          {createdInvitation?.invitation_url && (
            <>
              <div className="d-flex justify-content-center">
                <Card title="Scan Invitation QR Code">
                  <QRCode
                    size={isPublic ? 512 : 256}
                    value={createdInvitation?.invitation_url}
                  />
                </Card>
              </div>

              <Text className="d-block mb-3">
                Scan the QR Code with your digital wallet when it will be
                available to establish connection with Government and wait for
                your credential!
              </Text>
            </>
          )}
        </Col>

        {!isPublic && (
          <Col>
            {createdInvitation?.invitation_url ? (
              <Alert
                message="Copy Invitation URL"
                description={createdInvitation?.invitation_url}
                type="info"
                showIcon
              />
            ) : (
              !isPublic && <Empty description="No invitation" />
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CreateConnectionScreen;

interface Props {
  isPublic: boolean | undefined;
}
