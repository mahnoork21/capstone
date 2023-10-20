import styled from "@emotion/styled";

export const Container = styled.div`
  & .survey-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  & .survey-data-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin: 18px 0;
    font-size: 1rem;
  }

  & span {
    font-weight: 600;
  }
`;
