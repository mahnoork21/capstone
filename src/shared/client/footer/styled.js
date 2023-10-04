import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const FooterContainer = styled.div`
  width: 100%;
  height: 64px;
  background-color: white;
  margin-top: 32px;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    height: 80px;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  & img:last-child {
    visibility: hidden;
  }

  p {
    font-weight: 600;
    font-size: 0.8rem;

    @media only screen and (min-width: ${breakpoint.desktop}) {
      padding: 0 24px;
      font-size: 1rem;
    }
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 0 24px;
  }
`;
