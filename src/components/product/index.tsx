import { useMutation, useQuery } from "@apollo/client";
import { GETONEPRODUCT, PRODUCTS, UPDATEPRODUCT } from "../../apollo/product";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../common/spinner";
import CustomCard from "../common/CustomCard";
import { Button, Form, Input, InputNumber } from "antd";
import StyledTitle from "../common/StyledTitle";

type FieldType = {
  code?: string;
  count?: number;
  name?: string;
  original_price?: number;
  start_price?: number;
  end_price?: number;
  category?: number;
};

const ProductComponent = () => {
  const params = useParams();
  const navigate = useNavigate();

  const variables: {
    skip: number;
    take: number;
    where: { categoryId: number | null; count: number | null };
  } = {
    skip: 0,
    take: 10,
    where: {
      categoryId: null,
      count: null,
    },
  };

  const { data: product, loading } = useQuery(GETONEPRODUCT, {
    variables: {
      where: {
        id: params.id && +params.id,
      },
    },
    skip: !params.id || typeof +params.id !== "number",
  });

  const [updateProduct, { loading: updateProductLoading }] =
    useMutation(UPDATEPRODUCT);

  const onFinish = (values: any) => {
    updateProduct({
      variables: {
        input: {
          ...values,
        },
        where: {
          id: +params.id!,
        },
      },
      refetchQueries: [
        {
          query: PRODUCTS,
          variables: variables,
        },
        {
          query: GETONEPRODUCT,
          variables: {
            where: {
              id: +params.id!,
            },
          },
        },
      ],
      onCompleted: () => {
        navigate("/");
      },
    });
  };

  if (loading || updateProductLoading) {
    return <Spinner />;
  }

  return (
    <CustomCard>
      <StyledTitle>Edit Product</StyledTitle>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          ...product?.getOneProduct,
          category: product?.getOneProduct?.category.id,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
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
          rules={[{ required: true, message: "Please input the start price!" }]}
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

        {/* <Form.Item<FieldType>
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please input the category!" }]}
        >
          <Select
            showSearch
            placeholder="Select a category"
            optionFilterProp="children"
            // filterOption={filterOption}
            options={data?.categories?.map((category: any) => ({
              value: category?.id,
              label: category?.name,
            }))}
          />
        </Form.Item> */}

        <Form.Item<FieldType>
          label="Count"
          name="count"
          rules={[{ required: true, message: "Please input the count!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="default" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </CustomCard>
  );
};

export default ProductComponent;
