import React from "react";
import MainContainer from "@/shared/components/main-container";
import { AuthHeaderContainer } from "./styled";

const Header = () => {
  return (
    <MainContainer>
      <AuthHeaderContainer>
        <span>PUFI-2</span>
      </AuthHeaderContainer>
    </MainContainer>
  );
};

export default Header;
