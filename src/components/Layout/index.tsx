import {
  HomeOutlined,
  PlusOutlined,
  FilterOutlined,
  FolderAddOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

interface Props {
  children: any;
}

const LayoutComponent = (props: Props) => {
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  const navigationBtnStyles = {
    background: "transparent",
    outline: "none",
    border: "none",
    color: "#fff",
    display: "block",
    gap: "8px",
    height: "80px",
    width: "100% !important",
  };

  return (
    <Layout style={{ position: "relative" }}>
      <Sider
        trigger={null}
        collapsible={false}
        collapsed={false}
        style={{
          padding: 8,
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/",
              label: (
                <Button
                  style={navigationBtnStyles}
                  onClick={() => handleNavigate("/")}
                  icon={<HomeOutlined />}
                >
                  Products
                </Button>
              ),
            },

            {
              key: "/add-product",

              label: (
                <Button
                  style={navigationBtnStyles}
                  onClick={() => handleNavigate("/add-product")}
                  icon={<PlusOutlined />}
                >
                  Add Product
                </Button>
              ),
            },

            {
              key: "/add-category",
              label: (
                <Button
                  style={navigationBtnStyles}
                  onClick={() => handleNavigate("/add-category")}
                  icon={<FolderAddOutlined />}
                >
                  Add Category
                </Button>
              ),
            },
            {
              key: "/categories",
              label: (
                <Button
                  style={navigationBtnStyles}
                  onClick={() => handleNavigate("/categories")}
                  icon={<FilterOutlined />}
                >
                  Categories
                </Button>
              ),
            },
            {
              key: "/sold-products",
              label: (
                <Button
                  style={navigationBtnStyles}
                  onClick={() => handleNavigate("/sold-products")}
                  icon={<DollarOutlined />}
                >
                  Sold Products
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout
        style={{
          minHeight: "100vh",
          position: "absolute",
          left: "200px",
          right: 0,
          top: 0,
          width: "calc(100% - 200px)",
        }}
      >
        <Content
          style={{
            padding: 24,
            minHeight: "calc(100vh - 64px)",
            background: colorBgContainer,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
