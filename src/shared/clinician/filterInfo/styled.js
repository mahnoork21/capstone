import styled from "@emotion/styled";

export const Container = styled.div`
  border: solid var(--primary-blue) 2px;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(0, 149, 255, 0.148);
  max-width: 500px;
  min-width: 300px;

  & p {
    font-size: 0.875rem;
    padding: 2px 0px;
  }

  & .header {
    font-weight: 600;
    padding-bottom: 5px;
    align-self: center;
  }

  & .form-value-name {
    font-weight: 600;
  }
`;
