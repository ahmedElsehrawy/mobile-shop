import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  PlusOutlined,
  MinusOutlined,
  FilterOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

interface Props {
  children: any;
}

const LayoutComponent = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
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
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ padding: 8 }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: (
                <Button
                  style={navigationBtnStyles}
                  onClick={() => handleNavigate("/")}
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
              key: "3",
              icon: <PlusOutlined />,
              label: (
                <Button
                  style={navigationBtnStyles}
                  onClick={() => handleNavigate("/add-product")}
                >
                  Add Product
                </Button>
              ),
            },
            {
              key: "4",
              icon: <MinusOutlined />,
              label: (
                <Button
                  style={navigationBtnStyles}
                  onClick={() => handleNavigate("/sell-product")}
                >
                  Sell Product
                </Button>
              ),
            },
            {
              key: "5",
              icon: <FolderAddOutlined />,
              label: (
                <Button
                  style={navigationBtnStyles}
                  onClick={() => handleNavigate("/add-category")}
                >
                  Add Category
                </Button>
              ),
            },
            {
              key: "6",
              icon: <FilterOutlined />,
              label: (
                <Button
                  style={navigationBtnStyles}
                  onClick={() => handleNavigate("/categories")}
                >
                  Categories
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
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
