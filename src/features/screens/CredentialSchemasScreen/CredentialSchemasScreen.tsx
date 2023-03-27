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
} from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  getConnectionById,
  getConnections,
  getSchemas,
} from "../../../api/services";

const { Panel } = Collapse;

const CredentialSchemasScreen = () => {
  const [schemas, setSchemas] = useState<any>();

  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["getSchemas"],
    queryFn: () => getSchemas(),
    enabled: true,
  });

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
      <List
        size="large"
        header={<strong>Credential Schema Ids</strong>}
        bordered
        dataSource={schemas}
        renderItem={(item: any) => <List.Item>{item}</List.Item>}
      />
      <Row>
        <Col>
          <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <SettingOutlined key="setting" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joesch.moe/api/v1/random?key=1" />}
              title="Credential title"
              description="This is the description of credential"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CredentialSchemasScreen;
