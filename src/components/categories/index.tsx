import { Table, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { CATEGORIES, DELETECATEGORY } from "../../apollo/category";
import StyledTitle from "../common/StyledTitle";
import { useState } from "react";
import AlertComponent from "../common/Alert";

interface DataType {
  key: string;
  id: string;
  name: string;
  Product: any;
}

const CategoriesComponent = () => {
  const { data, loading } = useQuery(CATEGORIES);
  const [deleteCategory, { loading: deleteCategoryLoading }] =
    useMutation(DELETECATEGORY);
  const [alert, setAlert] = useState<{
    message: string;
    type: any;
    isAlertOpen: boolean;
  }>({
    message: "",
    type: undefined,
    isAlertOpen: false,
  });

  const confirm = (record: DataType) => {
    deleteCategory({
      variables: {
        input: {
          id: record?.id,
        },
      },
      onCompleted: () => {
        setAlert({
          message: `category deleted successfully`,
          type: "success",
          isAlertOpen: true,
        });
      },
      onError: () => {
        setAlert({
          message: `this category has some products related`,
          type: "error",
          isAlertOpen: true,
        });
      },
      refetchQueries: [{ query: CATEGORIES }],
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
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
          title="Delete this category"
          description="Are you sure to delete this category?"
          onConfirm={() => confirm(record)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined
            style={{
              color: "#ff7875",
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
      {alert.isAlertOpen && (
        <AlertComponent alert={alert} setAlert={setAlert} />
      )}
      <StyledTitle>Categories</StyledTitle>
      <Table
        columns={columns}
        dataSource={finishData}
        loading={loading || deleteCategoryLoading}
        pagination={false}
      />
    </>
  );
};

export default CategoriesComponent;
