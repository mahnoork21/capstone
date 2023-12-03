import React, { useContext } from "react";
import MainContainer from "@/shared/components/main-container";
import { Container, FooterContainer } from "./styled";
import Image from "next/image";
import { ClientContext } from "@/context/ClientContext";

const Footer = () => {
  const { breakpoint } = useContext(ClientContext);

  return (
    <FooterContainer>
      <MainContainer>
        <Container>
          <Image
            src="/bloorview-logo.png"
            width={breakpoint === "desktop" ? 180 : 100}
            height={breakpoint === "desktop" ? 70 : 40}
            alt="Bloorview Research Institute logo"
          />
          <p>Bloorview Research Institute © 2023</p>
          {breakpoint === "desktop" && (
            <Image
              src="/bloorview-logo.png"
              width={180}
              height={70}
              alt="Bloorview Research Institute logo"
            />
          )}
        </Container>
      </MainContainer>
    </FooterContainer>
  );
};

export default Footer;
