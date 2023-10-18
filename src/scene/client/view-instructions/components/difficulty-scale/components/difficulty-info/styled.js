import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
  margin-top: 15px;

  & .difficulty-title {
    padding: 0 20px;
    text-align: center;
    font-size: 1.125rem;
    font-weight: 700;
    height: 82px;
  }

  & .line-indicator-image {
    margin-right: 7px;
  }

  @media only screen and (max-width: ${breakpoint.desktop}) {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
    margin-top: 0;
    width: 100%;

    & .difficulty-title {
      font-size: 0.875rem;
      height: 100%;
      width: 116px;
    }
  }
`;

export const DifficultyDescription = styled.div`
  display: flex;
  width: 176px;
  height: 180px;
  padding: 20px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background-color: ${(props) => props.color};

  & p {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 150%; /* 1.3125rem */
  }

  & span {
    font-weight: 700;
  }

  @media only screen and (max-width: ${breakpoint.desktop}) {
    height: 100%;
  }
`;
