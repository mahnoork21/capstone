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
      props.isInSurvey ? "360px 360px" : "420px 420px"};
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
  width: ${(props) => (props.isInSurvey ? "320px" : "100%")};
  padding: ${(props) => (props.isInSurvey ? "16px" : "0px")};
  position: relative;

  @media screen and (min-width: ${breakpoint.desktop}) {
    padding: 24px;
    width: ${(props) => (props.isInSurvey ? "820px" : "100%")};
  }

  & > button {
    position: absolute;
    top: 16px;
    right: 24px;
    color: black;
  }
`;
