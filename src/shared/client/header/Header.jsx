import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.css";
import MainContainer from "@/shared/components/main-container";
import { Button } from "@mui/material";
import { HeaderButton, HeaderContainer } from "./styled";

const Header = () => {
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setDesktop(window.innerWidth > 600);
    };

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the initial visibility
    handleResize();

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <MainContainer>
      <HeaderContainer>
        <span>PUFI-2</span>
        <Navbar desktop={desktop} />

        {/* <HeaderButton variant="outlined">SAVE AND EXIT</HeaderButton> */}
      </HeaderContainer>
    </MainContainer>
  );
};

export default Header;
