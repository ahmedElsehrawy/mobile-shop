import { useQuery } from "@apollo/client";
import { PRODUCTS } from "../../apollo/product";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import AlertComponent from "../common/Alert";
import ProductsTable from "./ProductsTable";
import { useLocation } from "react-router-dom";

const ProductsComponent = () => {
  const { search } = useLocation();
  const pageFromUrl: string | null = search.replace("?", "").split("=")[1];
  const [page, setPage] = useState(+pageFromUrl || 1);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    type: any;
    isAlertOpen: boolean;
  }>({
    message: "",
    type: undefined,
    isAlertOpen: false,
  });

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

  useEffect(() => {
    if (pageFromUrl) {
      setPage(+pageFromUrl);
    }
  }, [pageFromUrl]);

  const { data, loading, refetch } = useQuery(PRODUCTS, {
    variables,
  });

  return (
    <div>
      <AlertComponent alert={alert} setAlert={setAlert} />
      <Filter
        setCount={setCount}
        setPage={setPage}
        setCategoryId={setCategoryId}
        page={page}
        categoryId={categoryId}
        count={count}
        refetch={refetch}
      />

      <ProductsTable
        productsData={data}
        loading={loading}
        categoryId={categoryId}
        count={count}
        setAlert={setAlert}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default ProductsComponent;
