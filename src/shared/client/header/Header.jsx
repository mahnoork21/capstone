import React from "react";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.css";
import MainContainer from "@/shared/components/main-container";
import { Button } from "@mui/material";
import { HeaderButton, HeaderContainer } from "./styled";

const Header = () => {
  return (
    <MainContainer>
      <HeaderContainer>
        <span>PUFI-2</span>
        <Navbar />
        {/* <HeaderButton variant="outlined">SAVE AND EXIT</HeaderButton> */}
      </HeaderContainer>
    </MainContainer>
  );
};

export default Header;
