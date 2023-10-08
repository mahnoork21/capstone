import React from "react";
import Navbar from "../navbar";
// import styles from "./AuthHeader.module.css";
import MainContainer from "@/shared/components/main-container";
// import { Button } from "@mui/material";
import { AuthHeaderContainer } from "./styled";
// import { ClientContext } from "@/context/ClientContext";
// import Image from "next/image";
// import { HeaderButtonType } from "@/utils/enums/headingButtonType";
// import { useRouter } from "next/router";

const Header = () => {
  //   const router = useRouter();

  return (
    <MainContainer>
      <AuthHeaderContainer>
        {/* <Navbar /> */}
        <span>PUFI-2</span>
        {/* <div></div> */}
      </AuthHeaderContainer>
    </MainContainer>
  );
};

export default Header;
