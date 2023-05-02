import { useQuery } from "@tanstack/react-query";
import { LinkOutlined } from "@ant-design/icons";
import {
  Table,
  Tabs,
  TabsProps,
  Tag,
  Button,
  Space,
  Modal,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getConnectionById,
  getConnections,
  acceptConnection,
} from "../../../../api/services";
import { formattedDateTime } from "../../../../helpers/utils.helpers";
import Title from "antd/es/typography/Title";
import "./styles.scss";

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
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["getConnections"],
    queryFn: () => getConnections(),
    enabled: true,
  });

  const connectionDetailsResponse = useQuery({
    queryKey: ["getConnectionById"],
    queryFn: () => getConnectionById(selectedConnectionId),
    enabled: !!selectedConnectionId,
  });

  const acceptConnectionRequest = (connectionId: string) => {
    acceptConnection(connectionId).then((res: any) => {
      notification.open({
        type: "success",
        message: `Connection established with ${res?.data?.their_label}`,
      });
      refetch();
    });
  };

  useEffect(() => {
    setConnections(data?.data?.results);
    return () => {
      console.log("cleanup");
    };
  }, [data]);

  const getStateColor = (
    state: "active" | "invitation" | "completed" | "request" | "response"
  ) => {
    switch (state) {
      case "active":
      case "completed":
        return " ";
      case "invitation":
        return "blue";
      case "response":
        return "purple";
      default:
        return "#f50";
    }
  };

  const renderTable = (isActive?: boolean, isPending?: boolean) => {
    const dataSource = isActive
      ? connections?.filter((connection: any) => connection.state === "active")
      : isPending
      ? connections?.filter((connection: any) => connection.state !== "active")
      : connections;

    return (
      <Table dataSource={dataSource} loading={isLoading} scroll={{ y: 450 }}>
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
        <Table.Column title="Detailed State" dataIndex="rfc23_state" />
        <Table.Column
          title="Created"
          dataIndex="created_at"
          render={value => {
            return formattedDateTime(value);
          }}
        />
        <Table.Column title="Holder Agent" dataIndex="their_label" />
        <Table.Column title="Holder DID" dataIndex="their_did" />
        <Table.Column
          title="Details"
          key="details"
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
        <Table.Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <Button
                type="default"
                disabled={record?.state !== "request"}
                onClick={() => acceptConnectionRequest(record?.connection_id)}
              >
                Accept
              </Button>
            </Space>
          )}
        />
      </Table>
    );
  };
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: `All`,
      children: renderTable(),
    },
    {
      key: "2",
      label: `Active`,
      children: renderTable(true),
    },
    {
      key: "3",
      label: `Pending`,
      children: renderTable(false, true),
    },
  ];

  return (
    <div className="connection-container">
      <Title level={4}>Connection List</Title>
      <div className="connection-content">
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
      </div>

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
