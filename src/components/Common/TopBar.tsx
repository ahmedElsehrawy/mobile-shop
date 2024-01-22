import React from "react";
import styled from "styled-components";

const TopBar = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  return <TopBarContainer>{children}</TopBarContainer>;
};

export default TopBar;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  max-width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
