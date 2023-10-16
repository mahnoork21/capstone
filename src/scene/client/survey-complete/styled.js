import styled from "@emotion/styled";

export const SurveyCompleteContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  height: 450px;
  border-radius: 12px;
  padding: 24px;
  justify-content: start;
  align-items: center;
  flex-direction: column;

  svg {
    width: 160px;
    height: 160px;
    color: var(--primary-green);
  }

  & > p:first-of-type {
    font-weight: 600;
    font-size: 1.5rem;
  }

  & > button {
    margin-top: 24px;
  }
`;
