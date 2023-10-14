import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
  margin-top: 16px;

  & .difficulty-title {
    padding: 0 20px;
    text-align: center;
    font-size: 1.125rem;
    font-weight: 700;
    height: 82px;

    @media only screen and (max-width: ${breakpoint.desktop}) {
      padding: 0 8px;
    }
  }

  & .line-indicator-image {
    margin-right: 7px;
  }

  @media only screen and (max-width: ${breakpoint.desktop}) {
    flex-direction: row;
    justify-content: center;
    gap: 8px;
    margin-top: 0;
    padding: 0px 8px;
    width: 100%;
    margin-right: 8px;

    & .difficulty-title {
      font-size: 0.875rem;
      height: 100%;
      width: ${(props) => (props.isInSurvey ? "100px" : "116px")};
    }

    & .line-indicator-image {
      max-width: 24px;
      max-height: 190px;
    }
  }
`;

export const DifficultyDescription = styled.div`
  display: flex;
  width: ${(props) => (props.isInSurvey ? "150px" : "176px")};
  height: 180px;
  padding: ${(props) => (props.isInSurvey ? "8px" : "20px")} 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background-color: ${(props) => props.color};

  & p {
    font-size: 0.875rem;
    font-weight: 400;
    text-align: center;
  }

  & span {
    font-weight: 700;
  }

  @media only screen and (max-width: ${breakpoint.desktop}) {
    height: 100%;
  }
`;
