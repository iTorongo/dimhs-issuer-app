import { SendOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Row,
  Col,
  Alert,
  Select,
  Form,
  DatePicker,
  TimePicker,
  Input,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getConnections,
  getCredDefs,
  getSchemas,
  issueCredentialSend,
} from "../../../../api/services";

const IssueCredentialScreen = () => {
  const [sendCredential, setSendCredential] = useState<any>();
  const [connections, setConnections] = useState<any>();
  const [credentialDefinitions, setCredentialDefinitions] = useState<any>();
  const [schemas, setSchemas] = useState<any>();

  const { data: connectionsData } = useQuery({
    queryKey: ["getConnections"],
    queryFn: () => getConnections(),
    enabled: true,
  });

  const { data: credentialDefinitionsData } = useQuery({
    queryKey: ["getCredentialDefinitions"],
    queryFn: () => getCredDefs(),
    enabled: true,
  });

  const { data: credentialSchemas } = useQuery({
    queryKey: ["getSchemas"],
    queryFn: () => getSchemas(),
    enabled: true,
  });

  useEffect(() => {
    setConnections(connectionsData?.data?.results);
    setCredentialDefinitions(
      credentialDefinitionsData?.data?.credential_definition_ids
    );
    setSchemas(credentialSchemas?.data?.schema_ids);
    return () => {
      console.log("cleanup");
    };
  }, [connectionsData, credentialDefinitionsData, credentialSchemas]);

  const issueCredentialSendMutation = useMutation({
    mutationFn: (reqBody: any) => {
      return issueCredentialSend(reqBody);
    },
    onSuccess: (data: any) => {
      setSendCredential(data?.data);
    },
  });

  const getActiveConnections = () => {
    return connections
      ?.filter((connection: any) => connection.state === "active")
      ?.map((conn: any) => {
        return {
          value: conn.connection_id,
          label: conn.their_label,
        };
      });
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    issueCredentialSendMutation.mutate({
      auto_remove: true,
      comment: values?.comment,
      connection_id: values?.connection_id,
      cred_def_id: values?.cred_def_id,
      credential_proposal: {
        "@type": "issue-credential/1.0/credential-preview",
        attributes: [
          {
            name: "name",
            value: values?.name,
          },
          {
            name: "birthdate_dateint",
            value: values?.birthdate_dateint,
          },
          {
            name: "degree",
            value: values?.degree,
          },
          {
            name: "timestamp",
            value: values?.timestamp,
          },
          {
            name: "date",
            value: values?.date,
          },
        ],
      },
      issuer_did: "LJaG58voggHsdSgm2rJr3c",
      schema_id: values?.schema_id,
      schema_issuer_did: "LJaG58voggHsdSgm2rJr3c",
      trace: true,
    });
  };

  return (
    <div className="issue-credential-container">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {sendCredential && (
            <Alert
              className="mb-2"
              message="Credential Sent"
              type="success"
              showIcon
            />
          )}
          <Card>
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              layout="horizontal"
              onFinish={onFinish}
            >
              <Form.Item
                label="Connection Id"
                name="connection_id"
                rules={[
                  { required: true, message: "Please select a connection Id!" },
                ]}
              >
                <Select
                  placeholder="Select a connection"
                  options={getActiveConnections()}
                />
              </Form.Item>
              <Form.Item
                label="Schema Id"
                name="schema_id"
                rules={[
                  { required: true, message: "Please select a schema Id!" },
                ]}
              >
                <Select
                  placeholder="Select a schema"
                  options={schemas?.map((schema: string) => {
                    return { value: schema, label: schema };
                  })}
                />
              </Form.Item>
              <Form.Item
                label="Credential Definition Id"
                name="cred_def_id"
                rules={[
                  {
                    required: true,
                    message: "Please select a credential definition Id!",
                  },
                ]}
              >
                <Select
                  placeholder="Select a credential definition"
                  options={credentialDefinitions?.map((credDef: string) => {
                    return { value: credDef, label: credDef };
                  })}
                />
              </Form.Item>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Degree" name="degree">
                <Input />
              </Form.Item>
              <Form.Item label="Date of Birth" name="birthdate_dateint">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Date" name="date">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Timestamp" name="timestamp">
                <TimePicker />
              </Form.Item>
              <Form.Item label="Comment" name="comment">
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SendOutlined />}
                  loading={issueCredentialSendMutation?.isLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Row gutter={[12, 12]}>
          <Col>
            {!!sendCredential && (
              <Card
                title="Issue Object"
                style={{ width: 600 }}
                loading={issueCredentialSendMutation?.isLoading}
              >
                <pre>{JSON.stringify(sendCredential, null, 2)}</pre>
              </Card>
            )}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default IssueCredentialScreen;
