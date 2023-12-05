import React from "react";
import {
  Typography,
  Button,
  Checkbox,
  Form,
  Input,
  Card,
  InputNumber,
} from "antd";

const { Title } = Typography;

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  code?: string;
  count?: number;
  name?: string;
  original_price?: number;
  start_price?: number;
  end_price?: number;
};

const AddProduct = () => {
  return (
    <>
      <Title>Add Product</Title>
      <Card style={{ borderRadius: 10, padding: 20 }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Code"
            name="code"
            rules={[{ required: true, message: "Please input the code!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Original Price"
            name="original_price"
            rules={[
              { required: true, message: "Please input the original price!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Start Price"
            name="start_price"
            rules={[
              { required: true, message: "Please input the start price!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="End Price"
            name="end_price"
            rules={[{ required: true, message: "Please input the end price!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Count"
            name="count"
            rules={[{ required: true, message: "Please input the count!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="default" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddProduct;
