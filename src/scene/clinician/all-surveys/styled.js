import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

export const MainContainerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 12px;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 8px;
    max-width: 840px;
  }
`;

export const Container = styled.div`
  & h1 {
    color: #000;
    font-family: Open Sans;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 36px */
    text-transform: uppercase;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;

    @media only screen and (max-width: ${breakpoint.desktop}) {
      flex-direction: column;
    }
  }

  .filterButtons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
  }

  @media only screen and (max-width: ${breakpoint.desktop}) {
    & h1 {
      font-size: 1.375rem;
    }
  }
`;

export const SearchButton = styled(Button)`
  color: var(--pufi-primary-blue, #1979be);
  font-family: Open Sans;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
  text-transform: uppercase;
`;

export const StyledBox = styled(Box)`
  display: flex;
  justify-content: flex-start;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 550px;
  width: 100%;
`;
