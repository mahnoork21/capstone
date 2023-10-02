import styled from "@emotion/styled";

export const UserMessageWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0;
  align-items: center;

  p {
    width: 550px;
    font-weight: ${(props) => (props.questionId === "do" ? 700 : 600)};
    font-size: 0.75rem;
  }
`;
