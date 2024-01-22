import {
  HomeOutlined,
  PlusOutlined,
  FilterOutlined,
  FolderAddOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { useSideBarWidth } from "../../../hooks/useSideBarWidth";

const { Sider } = Layout;

const SiderBar = () => {
  const location = useLocation();
  const [sideBarWidth] = useSideBarWidth();

  const navigate = useNavigate();

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  const navigationBtnStyles = {};

  return (
    <StyledSider
      trigger={null}
      collapsible={false}
      collapsed={false}
      //@ts-ignore
      width={sideBarWidth}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
        items={[
          {
            key: "/",
            label: (
              <StyledButton
                style={navigationBtnStyles}
                onClick={() => handleNavigate("/")}
                icon={<HomeOutlined />}
              >
                {+sideBarWidth > 80 && "Home"}
              </StyledButton>
            ),
          },
          {
            key: "/products",
            label: (
              <StyledButton
                style={navigationBtnStyles}
                onClick={() => handleNavigate("/products")}
                icon={<HomeOutlined />}
              >
                {+sideBarWidth > 80 && "Products"}
              </StyledButton>
            ),
          },

          {
            key: "/add-product",

            label: (
              <StyledButton
                style={navigationBtnStyles}
                onClick={() => handleNavigate("/add-product")}
                icon={<PlusOutlined />}
              >
                {+sideBarWidth > 80 && "Add Product"}
              </StyledButton>
            ),
          },

          {
            key: "/add-category",
            label: (
              <StyledButton
                style={navigationBtnStyles}
                onClick={() => handleNavigate("/add-category")}
                icon={<FolderAddOutlined />}
              >
                {+sideBarWidth > 80 && "Add Category"}
              </StyledButton>
            ),
          },
          {
            key: "/categories",
            label: (
              <StyledButton
                style={navigationBtnStyles}
                onClick={() => handleNavigate("/categories")}
                icon={<FilterOutlined />}
              >
                {+sideBarWidth > 80 && "Categories"}
              </StyledButton>
            ),
          },
          {
            key: "/sold-products",
            label: (
              <StyledButton
                style={navigationBtnStyles}
                onClick={() => handleNavigate("/sold-products")}
                icon={<DollarOutlined />}
              >
                {+sideBarWidth > 80 && "Sold Products"}
              </StyledButton>
            ),
          },
        ]}
      />
    </StyledSider>
  );
};

const StyledSider = styled(Sider)`
  padding: 8px;
  position: fixed !important;
  top: 0;
  left: 0;
  bottom: 0;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100% !important;
  background: transparent;
  outline: none;
  border: none;
  color: #fff;
  gap: 8px;
  height: 100%;

  .ant-btn-icon:hover {
    color: #fff !important;
  }

  &:hover {
    color: #fff !important;
  }
  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
`;

export default SiderBar;
