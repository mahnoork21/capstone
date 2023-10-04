import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: var(--max-width);
    margin: 0 auto;
  }
`;
