import { Collapse, List, Card, Row, Col, Descriptions } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getSchema, getSchemas } from "../../../../api/services";
import { capitalizeFirstLetter } from "../../../../helpers/utils.helpers";

const { Panel } = Collapse;

const CredentialSchemasScreen = () => {
  const [schemas, setSchemas] = useState<any>();

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

  useEffect(() => {
    setSchemas(data?.data?.schema_ids);
    return () => {
      console.log("cleanup");
    };
  }, [data]);

  return (
    <div className="schema-container">
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
