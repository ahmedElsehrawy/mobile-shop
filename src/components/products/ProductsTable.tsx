import { Table, Button, Popconfirm } from "antd";
import { DeleteOutlined, MinusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETEPRODUCT, PRODUCTS } from "../../apollo/product";
import { DataType, columns } from "./ProductTableCols";

interface Props {
  productsData: any;
  loading: boolean;
  categoryId: number | null;
  count: number | null;
  setAlert: Function;
  page: number;
  setPage: Function;
}

const ProductsTable = ({
  productsData,
  loading,
  categoryId,
  count,
  setAlert,
  page,
  setPage,
}: Props) => {
  const navigate = useNavigate();

  let cols = [
    ...columns,
    {
      title: "Sell Product",
      key: "action",
      render: (_: any, record: any) => (
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
      render: (_: any, record: any) => (
        <Popconfirm
          title="Delete the product"
          description="Are you sure to delete this product?"
          onConfirm={() => confirm(record)}
          okText="Yes"
          cancelText="No"
          placement="bottomLeft"
        >
          <DeleteOutlined style={{ color: "#ff7875", cursor: "pointer" }} />
        </Popconfirm>
      ),
    },
  ];

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

  const [deleteProduct, { loading: deleteProductLoading }] =
    useMutation(DELETEPRODUCT);

  const confirm = (record: DataType) => {
    deleteProduct({
      variables: {
        input: {
          id: record?.id,
        },
      },
      refetchQueries: [{ query: PRODUCTS, variables }],
      onCompleted: () => {
        setAlert({
          message: "product deleted successfully",
          type: "success",
          isAlertOpen: true,
        });
      },
      onError: () => {
        setAlert({
          message:
            "Oooops seems that this product is sold before, you can't delete",
          type: "error",
          isAlertOpen: true,
        });
      },
    });
  };

  return (
    <Table
      data-testid="product-table"
      columns={cols}
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
              onChange: (pageNumber) => {
                navigate(`?page=${pageNumber}`);
                setPage(pageNumber);
              },
            }
          : false
      }
    />
  );
};

export default ProductsTable;
