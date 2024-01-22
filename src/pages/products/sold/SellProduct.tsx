import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Select, InputNumber, Switch, Space } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GETONEPRODUCT, PRODUCTS, SELLPRODUCT } from "../../../apollo/product";
import Spinner from "../../../components/common/spinner";
import { useState } from "react";
import {
  GET_SOLD_PRODUCTS,
  MAKE_PRODUCT_SOLD,
} from "../../../apollo/sold-products";
import CustomCard from "../../../components/common/CustomCard";
import styled from "styled-components";
import StyledTitle from "../../../components/common/StyledTitle";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

enum Method {
  ORIGINAL = "original_price",
  START = "start_price",
  END = "end_price",
}

type FieldType = {
  count?: number;
  method?: Method;
  price?: number;
};

const SellProduct = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isAutoPrice, setIsAutoPrice] = useState<boolean>(true);

  let id = searchParams.get("id");

  const [sellProduct, { loading: sellProductLoading }] =
    useMutation(SELLPRODUCT);

  const [makeProductSold, { loading: makeProductSoldLoading }] =
    useMutation(MAKE_PRODUCT_SOLD);

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

  const onFinish = async (values: any) => {
    id &&
      (await sellProduct({
        variables: {
          input: {
            count: values.count,
            id: +id,
          },
        },
        refetchQueries: [{ query: PRODUCTS, variables }],
      }));

    id &&
      (await makeProductSold({
        variables: {
          input: {
            productId: +id,
            salePrice: values.method || values.price,
            quantity: values.count,
          },
        },
        refetchQueries: [
          {
            query: GET_SOLD_PRODUCTS,
            variables: {
              input: {
                createdAt: undefined,
              },
            },
          },
        ],
        onCompleted: () => {
          navigate("/sold-products");
        },
      }));
  };

  //select
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  //switch
  const onSwitchChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setIsAutoPrice(checked);
  };

  const methods = [
    { value: data?.getOneProduct?.original_price, label: "original price" },
    { value: data?.getOneProduct?.start_price, label: "start price" },
    { value: data?.getOneProduct?.end_price, label: "end price" },
  ];

  if (loading || sellProductLoading || makeProductSoldLoading) {
    return <Spinner />;
  }

  return (
    <>
      <CustomCard>
        <StyledTitle>Sell Product </StyledTitle>
        <Details>
          <p>{data?.getOneProduct?.name}</p>
          <p>Original Price: {data?.getOneProduct?.original_price}</p>
          <p>Start Price: {data?.getOneProduct?.start_price}</p>
          <p>End Price: {data?.getOneProduct?.end_price}</p>
        </Details>
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
            rules={[
              {
                required: true,
                message: "Please input the count!",
              },
            ]}
          >
            <InputNumber
              defaultValue={1}
              style={{ width: "100%" }}
              min={1}
              max={data?.getOneProduct?.count}
            />
          </Form.Item>
          <Space
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
              marginTop: 60,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <label>{isAutoPrice ? "Price on Method" : "Manual Price"}</label>
            <Switch checked={isAutoPrice} onChange={onSwitchChange} />
          </Space>
          {isAutoPrice ? (
            <Form.Item<FieldType>
              name="method"
              rules={[{ required: true, message: "Please input the method!" }]}
            >
              <Select
                showSearch
                placeholder="Select a method to sell"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={methods}
              />
            </Form.Item>
          ) : (
            <Form.Item<FieldType>
              name="price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              {/* <InputNumber style={{ width: "100%" }} /> */}

              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="default" htmlType="submit">
              Sell Product
            </Button>
          </Form.Item>
        </Form>
      </CustomCard>
    </>
  );
};

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 600;

  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    font-size: 16px;
  }
`;

export default SellProduct;
