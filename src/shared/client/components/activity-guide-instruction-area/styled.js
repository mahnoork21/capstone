import { breakpoint } from "@/styles/breakpoints";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const InstructionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 12px;
  justify-content: center;

  @media screen and (min-width: ${breakpoint.desktop}) {
    grid-template-columns: ${(props) =>
      props.isInSurvey ? "1fr" : "420px 420px"};
    row-gap: 16px;
    column-gap: 24px;
  }
`;

export const HowQuestion = styled.div`
  & span {
    color: #3a9034;
  }

  & p {
    font-size: 0.875rem;
    margin-bottom: 16px;
  }

  & h2 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  @media screen and (max-width: ${breakpoint.desktop}) {
    & h2 {
      font-size: 1rem;
    }
  }
`;

export const InstructionAreaWrapper = styled.div`
  width: 320px;
  padding: 24px;

  @media screen and (min-width: ${breakpoint.desktop}) {
    width: 100%;
    ${(props) =>
      props.isInSurvey
        ? css`
            max-width: 420px;
          `
        : css``}
  }
`;
