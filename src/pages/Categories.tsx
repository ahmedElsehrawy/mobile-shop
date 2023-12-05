import React from "react";
import { Typography, Space, Table, Button, message, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, MinusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  id: string;
  name: string;
}

const confirm = (record: DataType) => {
  console.log(record);
  message.success("Click on Yes");
};

const cancel = (e: any) => {
  message.error("Click on No");
  console.log(e);
};

const data: DataType[] = [
  {
    key: "1",
    id: "1",
    name: "John Brown",
  },
  {
    key: "2",
    id: "2",
    name: "Jim Green",
  },
  {
    key: "3",
    id: "3",
    name: "Joe Black",
  },
];

const { Title } = Typography;

const Categories = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
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

  return (
    <>
      <Title>Categories</Title>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default Categories;
