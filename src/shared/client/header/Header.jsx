import React, { useContext } from "react";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.css";
import MainContainer from "@/shared/components/main-container";
import { Button } from "@mui/material";
import { HeaderButton, HeaderContainer } from "./styled";
import { ClientContext } from "@/context/ClientContext";
import Image from "next/image";
import { HeaderButtonType } from "@/utils/enums/headingButtonType";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <MainContainer>
      <HeaderContainer>
        <span>PUFI-2</span>
        <Navbar />
      </HeaderContainer>
    </MainContainer>
  );
};

export default Header;
