import { Typography, Table, message, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { CATEGORIES, DELETECATEGORY } from "../graphql/category";

interface DataType {
  key: string;
  id: string;
  name: string;
  Product: any;
}

const cancel = (e: any) => {
  message.error("Click on No");
  console.log(e);
};

const { Title } = Typography;

const Categories = () => {
  const { data, loading } = useQuery(CATEGORIES);
  const [deleteCategory, { loading: deleteCategoryLoading }] =
    useMutation(DELETECATEGORY);

  const confirm = (record: DataType) => {
    deleteCategory({
      variables: {
        input: {
          id: record?.id,
        },
      },
    });
  };

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
          disabled={record?.Product.length > 0}
        >
          <DeleteOutlined
            style={{
              color: record?.Product.length > 0 ? "#ddd" : "#ff7875",
              cursor: "pointer",
            }}
          />
        </Popconfirm>
      ),
    },
  ];

  let finishData = data?.categories?.map((category: any) => ({
    ...category,
    key: category.id,
  }));

  return (
    <>
      <Title>Categories</Title>
      <Table
        columns={columns}
        dataSource={finishData}
        loading={loading || deleteCategoryLoading}
        pagination={false}
      />
    </>
  );
};

export default Categories;
