import { Button, Form, Input, InputNumber, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { CREATEPRODUCT, PRODUCTS } from "../../../apollo/product";
import { CATEGORIES } from "../../../apollo/category";
import Spinner from "../../../components/common/spinner";
import CustomCard from "../../../components/common/CustomCard";
import StyledTitle from "../../../components/common/StyledTitle";
import { useNavigate } from "react-router-dom";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

export type FieldType = {
  code?: string;
  count?: number;
  name?: string;
  original_price?: number;
  start_price?: number;
  end_price?: number;
  categoryId?: number;
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [createProduct, { loading: createProductLoading }] =
    useMutation(CREATEPRODUCT);

  const { data } = useQuery(CATEGORIES);
  console.log("🚀 ~ file: AddProduct.tsx:29 ~ AddProduct ~ data:", data);

  let variables = {
    skip: 0,
    take: 10,
    where: {
      categoryId: null,
      count: null,
    },
  };

  const onFinish = (values: any) => {
    createProduct({
      variables: {
        input: {
          ...values,
        },
      },
      onCompleted: () => {
        navigate("/products");
      },
      refetchQueries: [{ query: PRODUCTS, variables }],
    });
  };

  if (createProductLoading) {
    return <Spinner />;
  }

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <CustomCard>
        <StyledTitle>Add Product</StyledTitle>
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
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              filterOption={filterOption}
              options={data?.categories?.map((category: any) => ({
                value: category?.id,
                label: category?.name,
              }))}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Count"
            name="count"
            rules={[{ required: true, message: "Please input the count!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="default" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </CustomCard>
    </>
  );
};

export default AddProduct;
