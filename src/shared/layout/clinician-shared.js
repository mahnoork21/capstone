import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { breakpoint } from "@/styles/breakpoints";

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

export const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 116px;
`;

export const FlexBox = styled(Box)`
  display: flex;
`;

export const ContentBox = styled(Box)`
  flex-grow: 1;
  // padding: 16px;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: calc(100% - 280px);
    padding: 16px;
  }
`;
