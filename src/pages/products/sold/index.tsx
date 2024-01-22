import { Typography, Table, DatePickerProps, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_SOLD_PRODUCTS } from "../../../apollo/sold-products";
import Spinner from "../../../components/common/spinner";
import StyledTitle from "../../../components/common/StyledTitle";
import TopBar from "../../../components/common/TopBar";
import styled from "styled-components";

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
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
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
          <StyledTitle>Sold Products</StyledTitle>
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
          footer={() =>
            data?.soldProducts?.nodes.length > 0 && (
              <Footer>
                <FooterItem>Total: {data?.soldProducts?.total}</FooterItem>
                <FooterItem>
                  Original Total: {data?.soldProducts?.totalOriginalPrice}
                </FooterItem>
                <FooterItem>
                  Profit:
                  {data?.soldProducts?.total -
                    data?.soldProducts?.totalOriginalPrice}
                </FooterItem>
              </Footer>
            )
          }
        />
      </div>
    </div>
  );
};

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FooterItem = styled.div`
  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 7px;
    background-color: #6e6e6e8c;
    border-radius: 50%;
  }
`;

export default SoldProducts;
