import styled from "@emotion/styled";

export const GreyHeader = styled.div`
  display: flex;
  width: 60%;
  padding: 0.5rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 0.75rem;
  background: var(--pufi-grey-light, #f2f2f2);
  margin: 0 auto;
  margin-bottom: 1rem;

  & p {
    font-size: 0.875rem;
  }

  & h1 {
    font-size: 1.75rem;
    font-weight: 600;
  }
`;

export const FrequencyQuestion = styled.div`
  & span {
    color: #3a9034;
  }

  & p {
    font-size: 0.875rem;
  }

  & h2 {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ActivityGuideCard = styled.div`
  display: flex;
  width: 26.25rem;
  padding-right: 0px;
  align-items: center;
  gap: 0.75rem;
  border-radius: 0.75rem;
  border: 2px solid #1979be;
  margin-top: 0.75rem;

  & span {
    color: var(--pufi-primary, #3a9034);
  }

  & p {
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 0 3rem;
`;
