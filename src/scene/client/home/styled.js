import { breakpoint } from "@/styles/breakpoints";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 12px 16px 24px 16px;
  background-color: white;
  flex-wrap: wrap;
  flex-direction: row;

  .youtube-video {
    flex-grow: 1;
    display: block;
    aspect-ratio: 47 / 30;
    border-radius: 12px;
    width: 100%;

    @media only screen and (min-width: ${breakpoint.desktop}) {
      width: initial;
    }
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    flex-direction: column;
    border-radius: 16px;
    padding: 24px 24px 36px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    flex-direction: row;
    align-items: start;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: space-between;
  flex-grow: 1;
  max-width: 550px;

  & > h1 {
    color: var(--pufi-black, #333);
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 600;
  }

  & > p:first-of-type {
    margin-top: 12px;
  }

  & > p:last-of-type {
    margin-top: 16px;
    font-weight: 600;
  }

  & > ul {
    margin-left: 16px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-even;
  gap: 16px;
  width: 100%;
  margin-top: 24px;

  button {
    width: 50%;

    @media only screen and (min-width: ${breakpoint.desktop}) {
      flex-direction: row;
      width: auto;
    }
  }
`;

export const GreyP = styled.p`
  color: var(--pufi-grey-dark);
  font-weight: bold;
  font-size: 0.7rem;

  ${(props) =>
    props.$isDesktop
      ? css`
          text-align: right;
        `
      : css`
          text-align: left;
          margin-left: 8px;
        `}

  @media only screen and (min-width: ${breakpoint.desktop}) {
    flex-direction: row;
    width: auto;
    font-size: 0.825rem;
  }
`;
