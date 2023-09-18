import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 80%;
  border-radius: 16px;
  padding: 40px;
  background-color: white;
  flex-wrap: wrap;
  flex-direction: row;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    aligh-content: space-between;
    row-gap: 30px;
    padding-right: 30px;
    width: 50%;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-even;
    column-gap: 20px;
    width: 100%;
    margin-top: 30px;
  }

  .youtube-video {
    display: block;
    aspect-ratio: 40 / 30;
    width: 100%;
  }

  @media only screen and (min-width: 1225px) {
    .youtube-video {
      aspect-ratio: 45 / 30;
    }
  }

  @media only screen and (max-width: 1099px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 24px;

    .youtube-video {
      aspect-ratio: 50 / 30;
    }

    .content {
      width: 100%;
    }

    .buttons {
      justify-content: space-between;
    }
  }
`;

export const GreyP = styled.p`
  color: var(--pufi-grey-dark);
  font-weight: bold;
  font-size: 12px;
  text-align: right;
`;
