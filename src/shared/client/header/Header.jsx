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
  const { breakpoint, headerButtonType } = useContext(ClientContext);
  const router = useRouter();

  const handleOnClick = () => {
    if (headerButtonType === HeaderButtonType.START_SURVEY) {
      router.push("/client/survey");
    } else {
      //TODO save survey
    }
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <span>PUFI-2</span>
        {breakpoint === "desktop" ? (
          <HeaderButton variant="outlined" onClick={handleOnClick}>
            {headerButtonType === HeaderButtonType.SAVE_AND_EXIT
              ? "SAVE AND EXIT"
              : "START SURVEY"}
          </HeaderButton>
        ) : (
          <Image src="/icons/menu.svg" width={32} height={32} />
        )}
      </HeaderContainer>
    </MainContainer>
  );
};

export default Header;
