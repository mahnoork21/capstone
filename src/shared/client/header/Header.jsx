import React, { useContext } from "react";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.css";
import MainContainer from "@/shared/components/main-container";
import { Button } from "@mui/material";
import { HeaderButton, HeaderContainer } from "./styled";
import { ClientContext } from "@/context/ClientContext";
import Image from "next/image";

const Header = () => {
  const { breakpoint } = useContext(ClientContext);

  return (
    <MainContainer>
      <HeaderContainer>
        <span>PUFI-2</span>
        {breakpoint === "desktop" ? (
          <HeaderButton variant="outlined">SAVE AND EXIT</HeaderButton>
        ) : (
          <Image src="/icons/menu.svg" width={32} height={32} />
        )}
      </HeaderContainer>
    </MainContainer>
  );
};

export default Header;
