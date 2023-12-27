import {
  Typography,
  Table,
  Button,
  message,
  Popconfirm,
  Tag,
  InputNumber,
  Form,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, MinusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DELETEPRODUCT, PRODUCTS } from "../graphql/product";
import { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { CATEGORIES } from "../graphql/category";
import styled from "styled-components";

interface DataType {
  id: number;
  key: string;
  code: string;
  name: string;
  original_price: number;
  start_price: number;
  end_price: number;
  count: number;
  category: { name: string };
}

const cancel = (e: any) => {
  message.error("Click on No");
  console.log(e);
};

const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);

  let variables: {
    skip: number;
    take: number;
    where: { categoryId: number | null; count: number | null };
  } = {
    skip: (page - 1) * 10,
    take: 10,
    where: {
      categoryId: null,
      count: null,
    },
  };

  const {
    data: productsData,
    loading,
    refetch,
  } = useQuery(PRODUCTS, {
    variables,
  });
  console.log("🚀 ~ file: Home.tsx:138 ~ Home ~ data:", productsData);

  const [deleteProduct, { loading: deleteProductLoading }] =
    useMutation(DELETEPRODUCT);

  const { data } = useQuery(CATEGORIES);

  const confirm = (record: DataType) => {
    deleteProduct({
      variables: {
        input: {
          id: record?.id,
        },
      },
      refetchQueries: [{ query: PRODUCTS, variables }],
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "code",
      dataIndex: "code",
      key: "code",
      render: (text) => <span style={{ color: "#00f" }}>{text}</span>,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "original_price",
      dataIndex: "original_price",
      key: "original_price",
    },
    {
      title: "start_price",
      dataIndex: "start_price",
      key: "start_price",
    },
    {
      title: "end_price",
      dataIndex: "end_price",
      key: "end_price",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
      render: (_, record) => (
        <Tag style={{ padding: "0 10px" }} color="blue">
          {record.category.name}
        </Tag>
      ),
    },
    {
      title: "count",
      dataIndex: "count",
      key: "count",
      render: (_, record) => (
        <Tag
          style={{ padding: "0 20px" }}
          color={record.count > 2 ? "success" : "error"}
        >
          {record.count}
        </Tag>
      ),
    },

    {
      title: "Sell Product",
      key: "action",
      render: (_, record) => (
        <div style={{ width: "100%", textAlign: "center" }}>
          <Button
            type="primary"
            style={{
              margin: "auto",
              backgroundColor: record?.count === 0 ? "#a0a0a0" : "#001529",
            }}
            icon={<MinusOutlined />}
            onClick={() => {
              navigate(`/sell-product?id=${record.id}`);
            }}
            disabled={record?.count === 0}
          >
            Sell
          </Button>
        </div>
      ),
    },
    {
      title: "Delete",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => confirm(record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: "#ff7875", cursor: "pointer" }} />
        </Popconfirm>
      ),
    },
  ];

  const onFinish = (values: any) => {
    console.log("Success:", values);

    variables = {
      skip: (page - 1) * 10,
      take: 10,
      where: {
        categoryId: categoryId,
        count: count,
      },
    };

    refetch(variables);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    count?: number;
    categoryId?: number;
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setPage(1);
    setCategoryId(+value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <TopBar>
        <Title>Products</Title>
        <FilterContainer>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Item<FieldType> name="count" style={{ margin: "0 10px" }}>
              <InputNumber
                placeholder="count"
                onChange={(value: number | null) => {
                  setPage(1);
                  setCount(value);
                }}
              />
            </Form.Item>
            <Form.Item<FieldType> name="categoryId" style={{ marginBottom: 0 }}>
              <Select
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={data?.categories?.map((category: any) => ({
                  value: category?.id,
                  label: category?.name,
                }))}
                allowClear
              />
            </Form.Item>

            <Form.Item style={{ margin: "0 5px" }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<FilterOutlined />}
                style={{ backgroundColor: "#001529" }}
              >
                Filter
              </Button>
            </Form.Item>
          </Form>
        </FilterContainer>
      </TopBar>
      <Table
        columns={columns}
        dataSource={productsData?.products?.nodes}
        loading={loading || deleteProductLoading}
        scroll={{ x: 400 }}
        pagination={
          productsData?.products?.count > 10
            ? {
                position: ["bottomCenter"],
                pageSize: 10,
                current: page,
                total:
                  count || categoryId
                    ? productsData?.products?.nodes?.length
                    : productsData?.products?.count,
                onChange: (pageNumber) => setPage(pageNumber),
              }
            : false
        }
      />
    </>
  );
};

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Home;
