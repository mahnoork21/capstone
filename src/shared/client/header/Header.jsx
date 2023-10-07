import React, { useContext } from "react";
import MainContainer from "@/shared/components/main-container";
import { HeaderButton, HeaderContainer, NavigationWrapper } from "./styled";
import { useRouter } from "next/router";
import { ClientContext } from "@/context/ClientContext";
import Link from "next/link";
import { HeaderButtonType } from "@/utils/enums/headingButtonType";

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
        <NavigationWrapper>
          <Link href="/client">Home</Link>

          {breakpoint === "desktop" ? (
            <HeaderButton variant="outlined" onClick={handleOnClick}>
              {headerButtonType === HeaderButtonType.SAVE_AND_EXIT
                ? "SAVE AND EXIT"
                : "START SURVEY"}
            </HeaderButton>
          ) : (
            <Link href="/client/survey">
              {" "}
              {headerButtonType === HeaderButtonType.SAVE_AND_EXIT
                ? "SAVE AND EXIT"
                : "START SURVEY"}
            </Link>
          )}
        </NavigationWrapper>
      </HeaderContainer>
    </MainContainer>
  );
};

export default Header;
