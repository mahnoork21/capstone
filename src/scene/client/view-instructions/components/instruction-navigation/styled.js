import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const InstructionNavigationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .MuiButton-root,
  & .MuiButton-root:hover,
  & .MuiButton-root:active {
    font-weight: 600;
    border: 2px solid;
    font-size: 1rem;
    padding: 1rem 2.25rem;
    border-radius: 0.75rem;
    border: 4px solid var(--pufi-primary-dark, #3a9034);
  }

  @media screen and (max-width: ${breakpoint.desktop}) {
    & .MuiButton-root {
      font-size: 0.875rem;
      padding: 0.75rem 1.25rem;
    }
  }
`;
