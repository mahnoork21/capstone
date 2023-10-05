import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const StyledPositionIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  padding: 0.25rem 0rem;
  width: 8%;

  @media screen and (max-width: ${breakpoint.desktop}) {
    width: 15%;
  }
`;
