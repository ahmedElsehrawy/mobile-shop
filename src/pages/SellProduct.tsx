import { Typography, Card, Button, Form, Select, InputNumber } from "antd";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

enum Method {
  ORIGINAL,
  START,
  END,
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

type FieldType = {
  count?: number;
  method?: Method;
};

const SellProduct = () => {
  const [searchParams] = useSearchParams();
  console.log(
    "🚀 ~ file: sellProduct.tsx:9 ~ SellProduct ~ searchParams:",
    searchParams.get("code")
  );

  let code = searchParams.get("code");
  return (
    <>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Title level={4}>Iphone</Title>
          <Title level={4}>Original Price: 50</Title>
          <Title level={4}>Start Price: 90</Title>
          <Title level={4}>End Price: 70</Title>
        </div>
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
            name="method"
            rules={[{ required: true, message: "Please input the end price!" }]}
          >
            <Select
              defaultValue="ORIGINAL"
              onChange={handleChange}
              options={[
                { value: "ORIGINAL", label: "Original" },
                { value: "START", label: "Start" },
                { value: "END", label: "End" },
              ]}
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="count"
            rules={[{ required: true, message: "Please input the count!" }]}
          >
            <InputNumber defaultValue={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="default" htmlType="submit">
              Sell Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default SellProduct;
