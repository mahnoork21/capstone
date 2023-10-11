import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const InstructionNavigationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .nav-button {
    font-weight: 600;
    border: 2px solid;
    font-size: 1rem;
    padding: 16px 36px;
    border-radius: 12px;
    border: 4px solid var(--pufi-primary-dark, #3a9034);
  }

  & .nav-button:hover,
  & .nav-button:active {
    border: 4px solid var(--pufi-primary-dark, #3a9034);
  }

  @media screen and (max-width: ${breakpoint.desktop}) {
    & .MuiButton-root {
      font-size: 0.875rem;
      padding: 12px 20px;
    }
  }
`;
