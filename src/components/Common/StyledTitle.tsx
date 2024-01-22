import styled from "styled-components";
import { Typography } from "antd";

const { Title } = Typography;

const StyledTitle = ({ children }: { children: any }) => {
  return <CustomTile>{children}</CustomTile>;
};

export default StyledTitle;

const CustomTile = styled(Title)`
  margin: 0;

  @media screen and (max-width: 1024px) {
    font-size: 28px !important;
  }

  @media screen and (max-width: 768px) {
    font-size: 24px !important;
  }
`;
