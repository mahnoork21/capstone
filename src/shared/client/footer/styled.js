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

  & img:last-child {
    visibility: hidden;
  }

  p {
    font-weight: 600;
  }
`;
