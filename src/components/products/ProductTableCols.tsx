import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

export interface DataType {
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

export const columns: ColumnsType<DataType> = [
  {
    title: "code",
    dataIndex: "code",
    key: "code",
    render: (text, record) => <Link to={`/product/${record?.id}`}>{text}</Link>,
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
];
