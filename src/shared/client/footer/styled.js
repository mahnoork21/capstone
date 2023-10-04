import styled from "@emotion/styled";

export const FooterContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  margin-top: 32px;
  position: absolute;
  bottom: 0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;

  // & img:last-child {
  //   visibility: hidden;
  // }

  p {
    font-weight: 600;
    font-size: 1rem;
  }

  @media only screen and (max-width: 600px) {
    & img {
      width: 6.0625rem;
      height: 2.3125rem;
    }

    p {
      font-size: 0.5rem;
    }
  }
`;
