import React from "react";
import { Typography, Space, Table, Button, message, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, MinusOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  code: string;
  name: string;
  original_price: number;
  start_price: number;
  end_price: number;
}

const confirm = (record: DataType) => {
  console.log(record);
  message.success("Click on Yes");
};

const cancel = (e: any) => {
  message.error("Click on No");
  console.log(e);
};

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
    title: "Sell Product",
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
        <div style={{ width: "100%", textAlign: "center" }}>
          <Button
            type="primary"
            style={{ margin: "auto", backgroundColor: "#001529" }}
            icon={<MinusOutlined />}
          >
            Sell
          </Button>
        </div>
      </Popconfirm>
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

const data: DataType[] = [
  {
    key: "1",
    code: "1",
    name: "John Brown",
    original_price: 16,
    start_price: 20,
    end_price: 50,
  },
  {
    key: "2",
    code: "2",
    name: "Jim Green",
    original_price: 16,
    start_price: 20,
    end_price: 50,
  },
  {
    key: "3",
    code: "3",
    name: "Joe Black",
    original_price: 16,
    start_price: 20,
    end_price: 50,
  },
];

const { Title } = Typography;

const Home = () => {
  return (
    <>
      <Title>Products</Title>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default Home;
