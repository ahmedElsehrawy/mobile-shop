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
  border-radius: 10px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 8px;
    border-radius: 6px;
  }
`;

export default CustomCard;
