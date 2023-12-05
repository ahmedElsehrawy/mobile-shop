import { Typography, Table, Button, message, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, MinusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PRODUCTS } from "../graphql/product";

interface DataType {
  key: string;
  code: string;
  name: string;
  original_price: number;
  start_price: number;
  end_price: number;
  count: number;
}

const confirm = (record: DataType) => {
  console.log(record);
  message.success("Click on Yes");
};

const cancel = (e: any) => {
  message.error("Click on No");
  console.log(e);
};

const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const { data: productsData, loading } = useQuery(PRODUCTS);
  console.log("🚀 ~ file: Home.tsx:138 ~ Home ~ data:", productsData);

  const columns: ColumnsType<DataType> = [
    {
      title: "code",
      dataIndex: "code",
      key: "code",
      render: (text) => <a>{text}</a>,
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
      title: "count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Sell Product",
      key: "action",
      render: (_, record) => (
        <div style={{ width: "100%", textAlign: "center" }}>
          <Button
            type="primary"
            style={{ margin: "auto", backgroundColor: "#001529" }}
            icon={<MinusOutlined />}
            onClick={() => {
              navigate(`/sell-product?code=${record.code}`);
            }}
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

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <>
      <Title>Products</Title>
      <Table
        columns={columns}
        dataSource={productsData?.products}
        pagination={false}
      />
    </>
  );
};

export default Home;
