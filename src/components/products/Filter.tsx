import { Button, InputNumber, Form } from "antd";
import { useQuery } from "@apollo/client";
import { FilterOutlined } from "@ant-design/icons";
import { CATEGORIES } from "../../apollo/category";
import styled from "styled-components";
import StyledTitle from "../common/StyledTitle";
import TopBar from "../common/TopBar";
import CustomSelect from "../common/CustomSelect";

interface Props {
  setCount: Function;
  setPage: Function;
  setCategoryId: Function;
  page: number;
  categoryId: number | null;
  count: number | null;
  refetch: any;
}

const Filter = ({
  setCount,
  setPage,
  setCategoryId,
  page,
  categoryId,
  count,
  refetch,
}: Props) => {
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

  const { data } = useQuery(CATEGORIES);

  const onFinish = (values: any) => {
    console.log("Success:", values);

    variables = {
      skip: categoryId || count ? 0 : (page - 1) * 10,
      take: 10,
      where: {
        categoryId: categoryId,
        count: count,
      },
    };

    refetch(variables);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    count?: number;
    categoryId?: number;
  };

  const onSelectCategoryChange = (value: string) => {
    setCategoryId(+value);
  };

  return (
    <TopBar>
      <StyledTitle>Products</StyledTitle>
      <FilterContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Form.Item<FieldType> name="count" style={{ margin: "0 10px" }}>
            <InputNumber
              placeholder="count"
              min={1}
              onChange={(value: number | null) => {
                setCount(value);
              }}
            />
          </Form.Item>
          <Form.Item<FieldType> name="categoryId" style={{ marginBottom: 0 }}>
            <CustomSelect
              data={data?.categories}
              onChange={onSelectCategoryChange}
              placeHolder="Select A Category"
            />
          </Form.Item>

          <Form.Item style={{ margin: "0 5px" }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<FilterOutlined />}
              style={{ backgroundColor: "#001529" }}
            >
              Filter
            </Button>
          </Form.Item>
        </Form>
      </FilterContainer>
    </TopBar>
  );
};

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Filter;
