import { Layout, theme } from "antd";
import SiderBar from "./siderbar";
import styled from "styled-components";
import { useSideBarWidth } from "../../hooks/useSideBarWidth";

const { Content } = Layout;

interface Props {
  children: any;
}

const LayoutComponent = (props: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [sideBarWidth] = useSideBarWidth();

  return (
    <StyledLayout>
      <SiderBar />
      <StyledContent
        contentShift={sideBarWidth}
        style={{
          background: colorBgContainer,
        }}
      >
        {props.children}
      </StyledContent>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  position: relative;
  width: 100vw;
  padding: 0 !important;
  margin: 0 !important;
`;

interface StyledContentProps {
  contentShift: any;
}

const StyledContent = styled(Content)<StyledContentProps>`
  padding: 24px;
  width: ${(contentShift) =>
    `calc(100vw - ${contentShift.contentShift}px) !important`};
  position: fixed !important;
  left: ${(contentShift) => contentShift.contentShift};
  top: 0px !important;
  right: 0px !important;
  height: 100vh;
  overflow-y: auto;
`;

export default LayoutComponent;
