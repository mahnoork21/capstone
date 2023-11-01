import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const DifficultyInfoContainer = styled.div`
  display: flex;
  margin-top: 12px;

  @media only screen and (max-width: ${breakpoint.desktop}) {
    flex-direction: column;
  }
`;

export const DifficultyScaleInstructionWrapper = styled.div`
  padding: 16px;
  width: 320px;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 24px;
    width: ${(props) => (props.isInSurvey ? "1000px" : "100%")};
  }

  & > button {
    position: absolute;
    top: 16px;
    right: 24px;
    color: black;
  }
`;
