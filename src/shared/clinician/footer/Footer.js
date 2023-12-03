import { Container, FooterContainer } from "@/shared/clinician/footer/styled";

import MainContainer from "@/shared/components/main-container";
import Image from "next/image";
export const Footer = () => {
  return (
    <>
      <FooterContainer>
        <MainContainer>
          <Container>
            <Image src="/bloorview-logo.png" width={180} height={70} />
            <p>Bloorview Research Institute © 2023</p>
            <Image src="/bloorview-logo.png" width={180} height={70} />
          </Container>
        </MainContainer>
      </FooterContainer>
    </>
  );
};
