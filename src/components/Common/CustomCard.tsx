import React from "react";
import { Card } from "antd";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const CustomCard = ({ children }: Props) => {
  return <ResponsiveCard>{children}</ResponsiveCard>;
};

const ResponsiveCard = styled(Card)`
  box-shadow: #97979742 0px 2px 4px;
  border-radius: 16px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 8px;
  }

  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;

export default CustomCard;
