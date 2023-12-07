import { useMutation, useQuery } from "@apollo/client";
import { Typography, Card, Button, Form, Select, InputNumber } from "antd";
import { useSearchParams } from "react-router-dom";
import { GETONEPRODUCT, PRODUCTS, SELLPRODUCT } from "../graphql/product";
import Spinner from "../components/spinner";

const { Title } = Typography;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

enum Method {
  ORIGINAL,
  START,
  END,
}

type FieldType = {
  count?: number;
  method?: Method;
};

const SellProduct = () => {
  const [searchParams] = useSearchParams();

  let id = searchParams.get("id");

  const [sellProduct, { loading: sellProductLoading }] =
    useMutation(SELLPRODUCT);

  const { data, loading } = useQuery(GETONEPRODUCT, {
    variables: {
      where: {
        id: id && +id,
      },
    },
  });
  console.log("🚀 ~ file: sellProduct.tsx:38 ~ SellProduct ~ data:", data);

  let variables = {
    skip: 0,
    take: 10,
    where: {
      categoryId: null,
      count: null,
    },
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    id &&
      sellProduct({
        variables: {
          input: {
            ...values,
            id: +id,
          },
        },
        refetchQueries: [{ query: PRODUCTS, variables }],
      });
  };

  if (loading || sellProductLoading) {
    return <Spinner />;
  }

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
          <Title level={4}>{data?.getOneProduct?.name}</Title>
          <Title level={4}>
            Original Price: {data?.getOneProduct?.original_price}
          </Title>
          <Title level={4}>
            Start Price: {data?.getOneProduct?.start_price}
          </Title>
          <Title level={4}>End Price: {data?.getOneProduct?.end_price}</Title>
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
            name="count"
            rules={[{ required: true, message: "Please input the count!" }]}
          >
            <InputNumber defaultValue={0} style={{ width: "100%" }} />
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
