import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const StyledPositionIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  padding: 4px 0px;
  gap: 4px;

  @media screen and (min-width: ${breakpoint.desktop}) {
    gap: 8px;
  }
`;
