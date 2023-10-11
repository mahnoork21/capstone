import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const DifficultyInfoContainer = styled.div`
  display: flex;

  @media only screen and (max-width: ${breakpoint.desktop}) {
    flex-direction: column;
  }
`;
