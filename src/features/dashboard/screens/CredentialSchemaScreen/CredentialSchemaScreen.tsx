import {
  Collapse,
  Card,
  Row,
  Col,
  Descriptions,
  Button,
  Typography,
  Tag,
  notification,
  Spin,
  Empty,
} from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createSchema,
  getSchemaDetails,
  getSchemas,
} from "../../../../api/services";
import { capitalizeFirstLetter } from "../../../../helpers/utils.helpers";
import CreateCredentialSchema from "./components/CreateCreadentialSchema";

const { Panel } = Collapse;
const { Title } = Typography;

const CredentialSchemasScreen = () => {
  const [schemas, setsSchemas] = useState<any[]>([]);
  const [schemasLoading, setSchemasLoading] = useState(false);
  const { isLoading, data } = useQuery({
    queryKey: ["getSchemas"],
    queryFn: () => getSchemas(),
    enabled: true,
  });

  const schemaIds = data?.data?.schema_ids;

  const fetchAllASchema = async (ids: string[]) => {
    try {
      setSchemasLoading(true);
      const promises = ids?.map(id => getSchemaDetails(id));
      const results = await Promise.all(promises);
      const schemaList = results?.map(result => result?.data.schema);
      setsSchemas(schemaList);
    } finally {
      setSchemasLoading(false);
    }
  };

  useEffect(() => {
    if (schemaIds && schemaIds?.length) fetchAllASchema(schemaIds);
  }, [schemaIds]);

  const createSchemaMutation = useMutation({
    mutationFn: (reqBody: any) => {
      return createSchema(reqBody);
    },
    onSuccess: () => {
      notification.open({
        type: "success",
        message: "Credential Schema has been created",
      });
      fetchAllASchema(schemaIds);
    },
    onError: (error: any) => {
      notification.open({
        type: "error",
        message: `${error?.response?.data}`,
      });
    },
  });

  const onCreateSchema = (payload: any) => {
    createSchemaMutation.mutate({
      ...payload,
    });
  };

  const onCreatePredefinedSchema = () => {
    createSchemaMutation.mutate({
      schema_name: "National Identity(NID) Schema",
      schema_version: "1.0.0",
      attributes: [
        "first_name",
        "last_name",
        "SSID",
        "gender",
        "date_of_birth",
        "address",
        "city",
        "zip_code",
        "email",
        "phone_number",
      ],
    });
  };

  return (
    <div className="schema-container">
      <Title level={4}>Credential Schemas</Title>
      <Row>
        <Col span={24}>
          <Card>
            {isLoading || (schemasLoading && <Spin size="default" />)}
            {schemas?.length === 0 && (
              <Empty description="No Schema available yet" />
            )}
            {schemas?.map(schema => {
              return (
                <Descriptions
                  title="Schema Details"
                  className="mb-3"
                  key={schema.id}
                >
                  <Descriptions.Item label="Schema name">
                    {capitalizeFirstLetter(schema?.name)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Version">
                    {schema?.version}
                  </Descriptions.Item>
                  <Descriptions.Item label="Id">{schema?.id}</Descriptions.Item>
                  <Descriptions.Item label="Attributes">
                    {schema?.attrNames?.map((attribute: string) => (
                      <Tag color="processing">{attribute}</Tag>
                    ))}
                  </Descriptions.Item>
                </Descriptions>
              );
            })}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card title="Create Credential Schema" style={{ marginTop: 16 }}>
            <Button
              danger
              block
              onClick={onCreatePredefinedSchema}
              className="mb-3"
              loading={createSchemaMutation.isLoading}
            >
              Create Predefined Schema for NID
            </Button>
            <Title level={5}>Create New Schema</Title>
            <CreateCredentialSchema
              onSubmit={onCreateSchema}
              isLoading={createSchemaMutation.isLoading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CredentialSchemasScreen;
