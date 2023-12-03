import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const GreyHeader = styled.div`
  display: flex;
  width: 60%;
  padding: 8px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 12px;
  background: var(--pufi-grey-light, #f2f2f2);
  margin: 0 auto;
  margin-bottom: 16px;

  & p {
    font-size: 0.875rem;
  }

  & h1 {
    font-size: 1.75rem;
    font-weight: 600;
  }

  @media screen and (max-width: ${breakpoint.desktop}) {
    width: 100%;

    & h1 {
      font-size: 1.375rem;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 0px;

  @media screen and (max-width: ${breakpoint.desktop}) {
    padding: 0;
  }
`;
