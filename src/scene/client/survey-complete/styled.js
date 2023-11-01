import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const SurveyCompleteContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  height: 450px;
  border-radius: 12px;
  padding: 24px;
  justify-content: start;
  align-items: center;
  flex-direction: column;

  svg {
    width: 120px;
    height: 120px;
    color: var(--primary-green);

    @media screen and (min-width: ${breakpoint.desktop}) {
      width: 160px;
      height: 160px;
    }
  }

  & > p:first-of-type {
    font-weight: 600;
    font-size: 1.5rem;
  }

  & > button {
    margin-top: 24px;
  }
`;
