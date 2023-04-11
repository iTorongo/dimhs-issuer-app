import {
  EditOutlined,
  EllipsisOutlined,
  LinkOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Collapse,
  Table,
  Tabs,
  TabsProps,
  Tag,
  Button,
  Space,
  Modal,
  List,
  Card,
  Row,
  Col,
  Avatar,
  Descriptions,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  getConnectionById,
  getConnections,
  getSchema,
  getSchemas,
} from "../../../../api/services";
import { capitalizeFirstLetter } from "../../../../helpers/utils.helpers";

const { Panel } = Collapse;

const CredentialSchemasScreen = () => {
  const [schemas, setSchemas] = useState<any>();

  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ["getSchemas"],
    queryFn: () => getSchemas(),
    enabled: true,
  });

  const schemaResponse = useQuery({
    queryKey: ["getSchema"],
    queryFn: () => getSchema(schemas?.[0]),
    enabled: !!schemas?.[0],
  });

  console.log(schemaResponse);

  // const connectionDetailsResponse = useQuery({
  //   queryKey: ["getConnectionById"],
  //   queryFn: () => getConnectionById(selectedConnectionId),
  //   enabled: !!selectedConnectionId,
  // });

  useEffect(() => {
    setSchemas(data?.data?.schema_ids);
    return () => {
      console.log("cleanup");
    };
  }, [data]);

  return (
    <div className="schema-container">
      {/* <Space>
        <Button
          type="primary"
          size="large"
          icon={<LinkOutlined />}
          onClick={() => navigate("create")}
        >
          Create Connection
        </Button>
      </Space> */}
      {/* <List
        size="large"
        header={<strong>Credential Schema Ids</strong>}
        bordered
        dataSource={schemas}
        renderItem={(item: any) => <List.Item>{item}</List.Item>}
      /> */}
      <Row>
        <Col>
          <Card>
            <Descriptions title="Schema Details">
              <Descriptions.Item label="Schema name">
                {capitalizeFirstLetter(
                  schemaResponse?.data?.data?.schema?.name
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Version">
                {schemaResponse?.data?.data?.schema?.version}
              </Descriptions.Item>
              <Descriptions.Item label="Id">
                {schemaResponse?.data?.data?.schema?.id}
              </Descriptions.Item>
              <Descriptions.Item label="Attribute Names">
                <List
                  size="small"
                  dataSource={schemaResponse?.data?.data?.schema?.attrNames}
                  renderItem={(item: any) => <List.Item>{item}</List.Item>}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CredentialSchemasScreen;
