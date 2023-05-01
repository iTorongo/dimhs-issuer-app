import { Table, Tag, Button, Space, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getIssueCredentials } from "../../../../api/services";
import { formattedDateTime } from "../../../../helpers/utils.helpers";

const { Title } = Typography;

const IssuedCredentialsScreen = () => {
  const [issueCredentialList, setIssueCredentialList] = useState<any>();

  const { isLoading, error, data, isFetching, refetch } = useQuery({
    queryKey: ["getIssueCredentials"],
    queryFn: () => getIssueCredentials(),
    enabled: true,
  });

  useEffect(() => {
    setIssueCredentialList(data?.data?.results);
    return () => {
      console.log("cleanup");
    };
  }, [data]);

  const getStateColor = (
    state:
      | "offer_sent"
      | "offer_received"
      | "request_sent"
      | "request_received"
      | "credential_issued"
      | "done"
  ) => {
    switch (state) {
      case "credential_issued":
      case "done":
        return "#87d068";
      case "offer_sent":
      case "offer_received":
        return "blue";
      case "request_sent":
      case "request_received":
        return "purple";
      default:
        return "#f50";
    }
  };

  return (
    <div className="credential-container">
      <Title level={4}>Issued Credential List</Title>
      <Table
        dataSource={issueCredentialList}
        loading={isLoading}
        scroll={{ y: 450 }}
      >
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
        {/* <Table.Column
          title="Created"
          dataIndex="created_at"
          render={value => {
            return formattedDateTime(value);
          }}
        /> */}
        <Table.Column
          title="Updated"
          dataIndex="updated_at"
          render={value => {
            return formattedDateTime(value);
          }}
        />
        <Table.Column title="Schema Id" dataIndex="schema_id" />
        <Table.Column
          title="Cred Def Id"
          dataIndex="credential_definition_id"
        />
        <Table.Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <Button
                danger
                disabled={record?.state !== "credential_issued"}
                onClick={() => console.log("revoke")}
              >
                Revoke
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default IssuedCredentialsScreen;
