import React from "react";
import styles from "./Footer.module.css";
import MainContainer from "@/shared/components/main-container";
import { Container, FooterContainer } from "./styled";
import Image from "next/image";

const Footer = () => {
  return (
    <FooterContainer>
      <MainContainer>
        <Container>
          <Image src="/bloorview-logo.png" width={180} height={70} />
          <p>Bloorview Research Institute © 2023</p>
          <Image src="/bloorview-logo.png" width={180} height={70} />
        </Container>
      </MainContainer>
    </FooterContainer>
  );

  // return (
  //   <section className={styles.footer}>
  //     <section className={styles["footer-info"]}>
  //       <section className={styles["footer-info-center"]}>
  //         <span className={styles.tnc}> Terms and Conditions </span>
  //         <span className={styles.bri}>
  //           Holland Bloorview Kids Rehabilitation Hospital © 2023{" "}
  //         </span>
  //       </section>
  //     </section>
  //   </section>
  // );
};

export default Footer;
