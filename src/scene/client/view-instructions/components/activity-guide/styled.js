import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const GreyHeader = styled.div`
  display: flex;
  width: 60%;
  padding: 8px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 12px;
  background: var(--pufi-grey-light, #f2f2f2);
  margin: 0 auto;
  margin-bottom: 16px;

  & p {
    font-size: 0.875rem;
  }

  & h1 {
    font-size: 1.75rem;
    font-weight: 600;
  }

  @media screen and (max-width: ${breakpoint.desktop}) {
    width: 100%;

    & h1 {
      font-size: 1.375rem;
    }
  }
`;

export const HowQuestion = styled.div`
  & span {
    color: #3a9034;
  }

  & p {
    font-size: 0.875rem;
    margin-bottom: 12px;
  }

  & h2 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  @media screen and (max-width: ${breakpoint.desktop}) {
    & h2 {
      font-size: 1rem;
    }
  }
`;

export const ActivityGuideCard = styled.div`
  display: flex;
  width: 420px;
  padding-right: 0px;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  border: 2px solid #1979be;
  margin: 0 auto;

  & span {
    color: var(--pufi-primary, #3a9034);
  }

  & p {
    font-size: 1rem;
    font-weight: 600;
    padding: 5px 10px;
  }

  @media screen and (max-width: ${breakpoint.desktop}) {
    width: 320px;

    & p {
      font-size: 0.875rem;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 0 48px;

  @media screen and (max-width: ${breakpoint.desktop}) {
    padding: 0;
  }
`;
