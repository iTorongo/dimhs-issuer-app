import { Collapse, Card, Row, Col, Descriptions } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCredDef, getCredDefs } from "../../../../api/services";

const { Panel } = Collapse;

const CredentialDefinitionScreen = () => {
  const [credentialDefinitions, setCredentialDefinitions] = useState<any>();

  const { isLoading, data } = useQuery({
    queryKey: ["getCredentialDefinitions"],
    queryFn: () => getCredDefs(),
    enabled: true,
  });

  const credentialDefinitionResponse = useQuery({
    queryKey: ["getCredentialDefinition"],
    queryFn: () => getCredDef(credentialDefinitions?.[0]),
    enabled: !!credentialDefinitions?.[0],
  });

  useEffect(() => {
    setCredentialDefinitions(data?.data?.credential_definition_ids);
    return () => {
      console.log("cleanup");
    };
  }, [data]);

  return (
    <div className="definition-container">
      <Row>
        <Col>
          <Card>
            <Descriptions
              title={
                credentialDefinitionResponse?.data?.data?.credential_definition
                  ?.tag
              }
            >
              <Descriptions.Item label="Schema Id">
                {
                  credentialDefinitionResponse?.data?.data
                    ?.credential_definition?.schemaId
                }
              </Descriptions.Item>
              <Descriptions.Item label="Version">
                {
                  credentialDefinitionResponse?.data?.data
                    ?.credential_definition?.ver
                }
              </Descriptions.Item>
              <Descriptions.Item label="Id">
                {
                  credentialDefinitionResponse?.data?.data
                    ?.credential_definition?.id
                }
              </Descriptions.Item>
            </Descriptions>
          </Card>
          {/* <Card
            style={{ marginTop: 16 }}
            actions={[
              <SettingOutlined key="setting" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joesch.moe/api/v1/random?key=1" />}
              title="Schema title"
              description="This is the description of credential"
            />
            {/* <pre>
              <pre>{JSON.stringify(schemaResponse?.data, null, 2)}</pre>
            </pre> 
          </Card> */}
        </Col>
      </Row>
    </div>
  );
};

export default CredentialDefinitionScreen;