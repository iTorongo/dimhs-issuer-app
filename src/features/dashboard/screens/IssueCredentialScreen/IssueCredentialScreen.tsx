import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { Button, Card, Row, Col, Alert, Select, Form, Input } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getConnections,
  getCredDefs,
  getSchemaDetails,
  getSchemas,
  issueCredentialSend,
  createCredential,
  sendCredentialOffer,
  getPublicDIDFromWallet,
} from "../../../../api/services";
import {
  capitalizeFirstLetter,
  getSchemaDetailsFromId,
} from "../../../../helpers/utils.helpers";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";

const IssueCredentialScreen = () => {
  const [sendCredential, setSendCredential] = useState<any>();
  const [selectedSchema, setSelectedSchema] = useState<any>();

  const { data: connectionsData } = useQuery({
    queryKey: ["getConnections"],
    queryFn: () => getConnections(),
    enabled: true,
    staleTime: Infinity,
  });

  const { data: credentialDefinitionsData } = useQuery({
    queryKey: ["getCredentialDefinitions"],
    queryFn: () => getCredDefs(),
    enabled: true,
    // staleTime: Infinity,
  });

  const { data: credentialSchemas } = useQuery({
    queryKey: ["getSchemas"],
    queryFn: () => getSchemas(),
    enabled: true,
    staleTime: Infinity,
  });

  const { data: issuerDID } = useQuery({
    queryKey: ["getPublicDID"],
    queryFn: () => getPublicDIDFromWallet(),
    enabled: true,
    staleTime: Infinity,
  });

  // console.log(
  //   JSON.stringify(
  //     JSON.parse(
  //       atob(
  //         "eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiMjk5NTE5YmQtNzA3MC00YjY3LWI2MTQtYmFkMDY5Nzg1YmI4IiwgInNlcnZpY2VFbmRwb2ludCI6ICJodHRwOi8vaXAxNzItMTgtMC04MC1jZ3FqMmdhZTY5djAwMDk2a2Y3Zy04MDIwLmRpcmVjdC5sYWJzLnBsYXktd2l0aC1kb2NrZXIuY29tIiwgInJlY2lwaWVudEtleXMiOiBbIkVrQ0JMSEZEMmd5SGFkVGtaZUJIbUVMUnpkUXBXUzZwalo4RGhvd3BQa0w1Il0sICJsYWJlbCI6ICJmYWJlci5hZ2VudCJ9"
  //       )
  //     ),
  //     null,
  //     4
  //   )
  // );

  const handleSchemaChange = (value: string) => {
    getSchemaDetails(value)
      ?.then(response => {
        setSelectedSchema(response?.data?.schema);
      })
      .finally(() => {
        console.log("done");
      });
  };

  const issueCredentialSendMutation = useMutation({
    mutationFn: (reqBody: any) => {
      return issueCredentialSend(reqBody);
    },
    onSuccess: (data: any) => {
      setSendCredential(data?.data);
    },
  });

  const getActiveConnections = () => {
    return connectionsData?.data?.results
      ?.filter((connection: any) => connection.state === "active")
      ?.map((conn: any) => {
        return {
          value: conn.connection_id,
          label: conn.their_label,
        };
      });
  };

  const onFinish = (values: any) => {
    const schemaDetails = getSchemaDetailsFromId(values?.schema_id ?? "");
    const attributes = Object.entries(values)
      .map(([name, value]) => {
        return {
          name,
          value,
        };
      })
      ?.filter(
        obj =>
          obj.name !== "connection_id" &&
          obj.name !== "cred_def_id" &&
          obj.name !== "schema_id" &&
          obj.name !== "comment"
      );
    console.log(values);
    issueCredentialSendMutation.mutate({
      auto_remove: false,
      auto_issue: true,
      comment: values?.comment,
      connection_id: values?.connection_id,
      cred_def_id: values?.cred_def_id,
      credential_proposal: {
        "@type": "issue-credential/1.0/credential-preview",
        attributes,
      },
      issuer_did: issuerDID?.data?.result?.did,
      schema_id: values?.schema_id,
      schema_issuer_did: issuerDID?.data?.result?.did,
      schema_name: schemaDetails[2],
      schema_version: schemaDetails[3],
      trace: false,
    });
  };

  return (
    <div className="issue-credential-container">
      <Title level={4}>Issue and Send Credentials</Title>
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
                // rules={[
                //   { required: true, message: "Please select a connection Id!" },
                // ]}
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
                  options={credentialSchemas?.data?.schema_ids?.map(
                    (schema: string) => {
                      return { value: schema, label: schema };
                    }
                  )}
                  onSelect={handleSchemaChange}
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
                  options={credentialDefinitionsData?.data?.credential_definition_ids?.map(
                    (credDef: string) => {
                      return { value: credDef, label: credDef };
                    }
                  )}
                />
              </Form.Item>
              {selectedSchema?.attrNames?.map((attr: string) => {
                const readableAttribute = attr?.replaceAll("_", " ");
                return (
                  <Form.Item
                    key={attr}
                    label={capitalizeFirstLetter(readableAttribute)}
                    name={attr}
                    rules={[
                      {
                        required: true,
                        message: `Please input ${readableAttribute}`,
                      },
                    ]}
                  >
                    <Input placeholder={`Enter ${readableAttribute}`} />
                    {/* {attr?.includes("date") ? (
                      <DatePicker format={DateFormats.DAY_MONTH_YEAR} />
                    ) : ( */}
                    {/* )} */}
                  </Form.Item>
                );
              })}
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
