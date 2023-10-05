import React from "react";
import Navbar from "../navbar/Navbar";
// import styles from "./AuthHeader.module.css";
import MainContainer from "@/shared/components/main-container";
// import { Button } from "@mui/material";
import { HeaderContainer } from "./styled";
// import { ClientContext } from "@/context/ClientContext";
// import Image from "next/image";
// import { HeaderButtonType } from "@/utils/enums/headingButtonType";
// import { useRouter } from "next/router";

const Header = () => {
  //   const router = useRouter();

  return (
    <MainContainer>
      <HeaderContainer>
        <Navbar />
        <span>PUFI-2</span>
        <div></div>
      </HeaderContainer>
    </MainContainer>
  );
};

export default Header;
