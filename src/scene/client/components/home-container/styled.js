import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border-radius: 1rem;
  padding: 24px 24px 36px;
  background-color: white;
  flex-wrap: wrap;
  flex-direction: row;

  .intro-body-header {
    color: var(--pufi-black, #333);
    font-family: Open Sans;
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 2.625rem */
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-content: space-between;
    row-gap: 24px;
    padding-right: 30px;
    width: 50%;
  }

  .content-text {
    font-size: 1rem;
  }

  .instructions1-questions-list {
    padding-left: 2rem;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-even;
    column-gap: 16px;
    width: 100%;
    margin-top: 30px;
  }

  .youtube-video {
    display: block;
    aspect-ratio: 47 / 30;
    width: 100%;
    border-radius: 12px;
  }

  // .wide {
  //   display: block;
  //   aspect-ratio: 90 / 30;
  //   width: 100%;
  //   border-radius: 12px;
  // }

  @media only screen and (max-width: 987px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 24px;

    .content {
      width: 100%;
    }

    .buttons {
      justify-content: space-between;
    }
  }

  @media only screen and (max-width: 600px) {
    .intro-body-header {
      font-size: 1.375rem;
    }

    .content-text {
      font-size: 0.875rem;
    }
  }
`;

export const GreyP = styled.p`
  color: var(--pufi-grey-dark);
  font-weight: bold;
  font-size: 10px;
  text-align: right;
`;
