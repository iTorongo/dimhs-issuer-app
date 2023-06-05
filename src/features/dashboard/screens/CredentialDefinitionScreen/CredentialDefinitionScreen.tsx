import {
  Card,
  Row,
  Col,
  Descriptions,
  Button,
  Typography,
  notification,
  Spin,
  Empty,
  Form,
  Select,
  Input,
  Checkbox,
} from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCredDefs,
  getCredDefDetails,
  getSchemas,
  createCredentialDefinition,
} from "../../../../api/services";
import Title from "antd/es/typography/Title";

const CredentialDefinitionScreen = () => {
  const [credentialDefinitions, setCredentialDefinitions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const { data, refetch } = useQuery({
    queryKey: ["getCredDefs"],
    queryFn: () => getCredDefs(),
    enabled: true,
  });

  const { data: schemaData } = useQuery({
    queryKey: ["getSchemas"],
    queryFn: () => getSchemas(),
    enabled: true,
  });

  const credentialDefinitionsIds = data?.data?.credential_definition_ids;

  const fetchAllCredDefinitions = async (ids: string[]) => {
    try {
      setIsLoading(true);
      const promises = ids?.map(id => getCredDefDetails(id));
      const results = await Promise.all(promises);
      const credentialDefList = results?.map(
        result => result?.data.credential_definition
      );
      setCredentialDefinitions(credentialDefList);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (credentialDefinitionsIds && credentialDefinitionsIds?.length)
      fetchAllCredDefinitions(credentialDefinitionsIds);
  }, [credentialDefinitionsIds]);

  const createCredDefMutation = useMutation({
    mutationFn: (reqBody: any) => {
      return createCredentialDefinition(reqBody);
    },
    onSuccess: () => {
      notification.open({
        type: "success",
        message: "Credential Definition has been created",
      });
      refetch();
      fetchAllCredDefinitions(credentialDefinitionsIds);
      form.resetFields();
    },
    onError: (error: any) => {
      notification.open({
        type: "error",
        message: `${error?.response?.data}`,
      });
    },
  });

  const onCreateCredentialDefinition = (payload: any) => {
    createCredDefMutation.mutate({
      ...payload,
      revocation_registry_size: 100,
    });
  };

  console.log(credentialDefinitions);

  return (
    <div className="definition-container">
      <Title level={4}>Credential Definitions</Title>
      <Row>
        <Col span={24}>
          <Card>
            {isLoading && <Spin size="default" />}
            {credentialDefinitions?.length === 0 && (
              <Empty description="No Credential Definition available yet" />
            )}
            {credentialDefinitions?.map(credDef => {
              return (
                <Descriptions
                  title="Credential Definition Details"
                  className="mb-3"
                  key={credDef.id}
                >
                  <Descriptions.Item label="Version">
                    {credDef?.ver}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tag">
                    {credDef?.tag}
                  </Descriptions.Item>
                  <Descriptions.Item label="Schema Id">
                    {credDef?.schemaId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Credential Definition Id">
                    {credDef?.id}
                  </Descriptions.Item>
                </Descriptions>
              );
            })}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card
            title="Create Credential Definition"
            style={{ marginTop: 16 }}
            className="w-100"
          >
            <Form
              name="basic"
              onFinish={onCreateCredentialDefinition}
              autoComplete="off"
              layout="vertical"
              wrapperCol={{ span: 16 }}
              disabled={createCredDefMutation?.isLoading}
              form={form}
            >
              <Form.Item
                label="Select Schema Id"
                name="schema_id"
                rules={[
                  { required: true, message: "Please select a schema id" },
                ]}
              >
                <Select>
                  {schemaData?.data?.schema_ids?.map((schemId: string) => (
                    <Select.Option value={schemId}>{schemId}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Tag"
                name="tag"
                rules={[{ required: true, message: "Please write a tag name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="support_revocation" valuePropName="checked">
                <Checkbox>Support Revocation</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={createCredDefMutation?.isLoading}
                >
                  Create Credential Definition
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CredentialDefinitionScreen;
