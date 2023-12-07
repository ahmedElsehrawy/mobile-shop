import { Typography, Button, Form, Input, Card } from "antd";
import { useMutation } from "@apollo/client";
import { CREATECATEGORY } from "../graphql/category";
import Spinner from "../components/spinner";

const { Title } = Typography;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  name?: string;
};

const AddCategory = () => {
  const [addCategory, { loading }] = useMutation(CREATECATEGORY);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    addCategory({
      variables: {
        input: {
          ...values,
        },
      },
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Title>Add Category</Title>
      <Card style={{ borderRadius: 10, padding: 20 }}>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="default" htmlType="submit">
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddCategory;
