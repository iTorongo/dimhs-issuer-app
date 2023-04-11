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
} from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getConnectionById, getConnections } from "../../../../api/services";
import "./styles.scss";

const { Panel } = Collapse;

const ConnectionsScreen = () => {
  const [connections, setConnections] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string>();

  const showDetailsModal = (connectionId: string) => {
    setSelectedConnectionId(connectionId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedConnectionId(undefined);
  };

  const navigate = useNavigate();
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["getConnections"],
    queryFn: () => getConnections(),
    enabled: true,
  });

  const connectionDetailsResponse = useQuery({
    queryKey: ["getConnectionById"],
    queryFn: () => getConnectionById(selectedConnectionId),
    enabled: !!selectedConnectionId,
  });

  useEffect(() => {
    setConnections(data?.data?.results);
    return () => {
      console.log("cleanup");
    };
  }, [data]);

  const getStateColor = (state: "active" | "invitation" | "rejected") => {
    switch (state) {
      case "active":
        return "#87d068";
      case "invitation":
        return "blue";
      default:
        return "#f50";
    }
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: `All`,
      children: (
        <Table dataSource={connections} loading={isLoading} scroll={{ y: 450 }}>
          <Table.Column title="Connection Id" dataIndex="connection_id" />
          <Table.Column
            title="State"
            dataIndex="state"
            render={state => (
              <Tag color={getStateColor(state)} key={state}>
                {state}
              </Tag>
            )}
          />
          <Table.Column title="Created" dataIndex="created_at" />
          <Table.Column title="Holder Agent" dataIndex="their_label" />
          <Table.Column title="Holder DID" dataIndex="their_did" />
          <Table.Column
            title="Action"
            key="action"
            render={(_: any, record: any) => (
              <Space size="middle">
                <Button
                  type="link"
                  onClick={() => showDetailsModal(record?.connection_id)}
                >
                  Details
                </Button>
              </Space>
            )}
          />
        </Table>
      ),
    },
    {
      key: "2",
      label: `Active`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: `Pending`,
      children: `Content of Tab Pane 3`,
    },
  ];

  return (
    <div className="connection-container">
      <Space>
        <Button
          type="primary"
          size="large"
          icon={<LinkOutlined />}
          onClick={() => navigate("create")}
        >
          Create Connection
        </Button>
      </Space>
      <Tabs items={tabItems} />
      {/* <Collapse accordion>
        {data?.data?.results?.map((result: any) => {
          return (
            <Panel header={result.connection_id} key={result.connection_id}>
              <p>{result.connection_id}</p>
            </Panel>
          );
        })}
      </Collapse> */}

      <Modal
        title="Connection Details"
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        width={800}
        destroyOnClose
      >
        <div>
          <pre>{JSON.stringify(connectionDetailsResponse?.data, null, 2)}</pre>
        </div>
      </Modal>
    </div>
  );
};

export default ConnectionsScreen;
