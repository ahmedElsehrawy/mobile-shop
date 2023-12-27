import { Typography, Table, Tag, DatePickerProps, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_SOLD_PRODUCTS } from "../graphql/sold-products";
import Spinner from "../components/spinner";
import { TopBar } from "./Home";

interface DataType {
  id: number;
  salePrice: number;
  createdAt: string;
  product: {
    id: number;
    code: string;
    name: string;
  };
}

const { Title } = Typography;

const SoldProducts = () => {
  const [dateFilter, setDateFilter] = useState<string>("");

  let variables = {
    input: {
      createdAt: dateFilter !== "" ? dateFilter : undefined,
    },
  };

  const { data, loading } = useQuery(GET_SOLD_PRODUCTS, {
    variables,
  });
  console.log(
    "🚀 ~ file: SoldProducts.tsx:44 ~ SoldProducts ~ productsData:",
    data
  );

  const columns: ColumnsType<DataType> = [
    {
      title: "code",
      dataIndex: "code",
      key: "code",
      render: (_, record) => (
        <span style={{ color: "#00f" }}>{record.product?.code}</span>
      ),
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <>{record.product?.name}</>,
    },

    {
      title: "salePrice",
      dataIndex: "salePrice",
      key: "salePrice",
    },

    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    // {
    //   title: "category",
    //   dataIndex: "category",
    //   key: "category",
    //   render: (_, record) => (
    //     <Tag style={{ padding: "0 10px" }} color="blue">
    //       {record.category.name}
    //     </Tag>
    //   ),
    // },
  ];

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDateFilter(dateString);
  };

  loading && <Spinner />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "calc(100vh - 48px)",
      }}
    >
      <div>
        <TopBar>
          <Title>Sold Products</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DatePicker onChange={onChange} />
          </div>
        </TopBar>
        <Table
          columns={columns}
          dataSource={data?.soldProducts?.nodes}
          loading={loading}
          scroll={{ x: 400 }}
          pagination={false}
        />
      </div>

      {data?.soldProducts?.nodes.length > 0 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#eee",
            padding: 20,
            borderRadius: 3,
          }}
        >
          <Typography.Text>Total: {data?.soldProducts?.total}</Typography.Text>
          <Typography.Text>
            Original Total: {data?.soldProducts?.totalOriginalPrice}
          </Typography.Text>
          <Typography.Text>
            Profit:
            {data?.soldProducts?.total - data?.soldProducts?.totalOriginalPrice}
          </Typography.Text>
        </div>
      )}
    </div>
  );
};

export default SoldProducts;
