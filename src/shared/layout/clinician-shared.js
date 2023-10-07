  import { breakpoint } from "@/styles/breakpoints";
  import styled from "@emotion/styled";

export const CurvedBackground = styled.div`
  width: 100vw;
  height: 60vh;
  background-image: url("/curved-background-clinician.svg");
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const NormalBackground = styled.div`
  width: 100vw;
  height: 3.8rem;
  background: #1979BE;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  
  @media only screen and (min-width: ${breakpoint.desktop}) {
    height: 5rem;
  }
`;

export const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 116px;
`;
