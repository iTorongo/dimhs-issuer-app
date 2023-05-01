import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const CreateCredentialSchema = ({ onSubmit, isLoading }: any) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      name="dynamic_form_item"
      form={form}
      onFinish={onFinish}
      style={{ minWidth: 800 }}
      layout="vertical"
    >
      <Form.Item
        label="Schema Name"
        name="schema_name"
        rules={[{ required: true, message: "Please input schema name" }]}
      >
        <Input style={{ width: "60%" }} />
      </Form.Item>
      <Form.Item
        label="Schema Version"
        name="schema_version"
        rules={[{ required: true, message: "Please input schema version " }]}
      >
        <Input style={{ width: "60%" }} placeholder="ie: 1.0.1" />
      </Form.Item>
      <Form.List name="attributes">
        {(fields, { add, remove }, { errors }) => (
          <>
            <p>Attributes:</p>
            {fields.map((field, index) => (
              <Form.Item required={false} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input attribute name!",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Attribute name"
                    style={{ width: "60%" }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button ms-2"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add Attribute
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Create Credential Schema
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateCredentialSchema;
