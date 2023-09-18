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
        <HeaderButton variant="outlined">SAVE AND EXIT</HeaderButton>
      </HeaderContainer>
    </MainContainer>
  );

  // return (
  //   <section className={styles.header}>
  //     <section className={styles["header-top"]}>
  //       <section className={styles["header-top__logo"]}>
  //         <a href="/client" className={styles["header-logo"]}>
  //           <i>
  //             <strong>PUFI-2</strong>
  //           </i>
  //         </a>
  //       </section>
  //       <section className={styles["header-top__navbar"]}>
  //         <section className={styles["header-top__navigation"]}>
  //           <Navbar />
  //         </section>
  //         <hr className={styles["header-top__seperator"]} />
  //       </section>
  //     </section>
  //   </section>
  // );
};

export default Header;
