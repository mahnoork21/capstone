import React from "react";
import Navbar from "../navbar/Navbar";
// import styles from "./AuthHeader.module.css";
import MainContainer from "@/shared/components/main-container";
// import { Button } from "@mui/material";
import { NormalHeaderContainer } from "./styled";
// import { ClientContext } from "@/context/ClientContext";
// import Image from "next/image";
// import { HeaderButtonType } from "@/utils/enums/headingButtonType";
// import { useRouter } from "next/router";

const NormalHeader = () => {
  //   const router = useRouter();

  return (
    <MainContainer>
      <NormalHeaderContainer>
        <Navbar />
        <span>PUFI-2</span>
        <div></div>
      </NormalHeaderContainer>
    </MainContainer>
  );
};

export default NormalHeader;
