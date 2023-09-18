import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const Container = styled.div`
  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: var(--max-width);
    margin: 0 auto;
  }
`;
