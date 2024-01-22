import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import Spinner from "../../common/spinner";
import { CATEGORIES, CREATECATEGORY } from "../../../apollo/category";
import StyledTitle from "../../common/StyledTitle";
import CustomCard from "../../common/CustomCard";
import { useNavigate } from "react-router-dom";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  name?: string;
};

const AddCategoryComponent = () => {
  const [addCategory, { loading }] = useMutation(CREATECATEGORY);
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    addCategory({
      variables: {
        input: {
          ...values,
        },
      },
      refetchQueries: [{ query: CATEGORIES }],
      onCompleted: () => {
        navigate("/categories");
      },
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <CustomCard>
        <StyledTitle>Add Category</StyledTitle>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="default" htmlType="submit">
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </CustomCard>
    </>
  );
};

export default AddCategoryComponent;
