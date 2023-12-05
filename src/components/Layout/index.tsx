import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  PlusOutlined,
  FilterOutlined,
  FolderAddOutlined,
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
    width: "100% !important",
    outline: "none",
    border: "none",
    color: "#fff",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    gap: "8px",
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible={false}
        collapsed={false}
        style={{ padding: 8 }}
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
                  Home
                </Button>
              ),
            },
            // {
            //   key: "2",
            //   icon: <UnorderedListOutlined />,
            //   label: (
            //     <Button
            //       style={navigationBtnStyles}
            //       onClick={() => handleNavigate("/products")}
            //     >
            //       Products
            //     </Button>
            //   ),
            // },
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
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
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
