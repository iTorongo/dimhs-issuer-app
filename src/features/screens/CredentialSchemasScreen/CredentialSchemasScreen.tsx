import { LinkOutlined } from "@ant-design/icons";
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
} from "antd";
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
    </div>
  );
};

export default CredentialSchemasScreen;
