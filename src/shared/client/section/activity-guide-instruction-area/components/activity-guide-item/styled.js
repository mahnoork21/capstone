import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const ActivityGuideCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 450px;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  border: 2px solid var(--primary-blue);
  margin: 0 auto;
  background-color: white;

  & span {
    color: #53bb50;
  }

  & p {
    font-size: 1rem;
    font-weight: 600;
    padding: 5px 10px;
  }

  @media screen and (max-width: ${breakpoint.desktop}) {
    & p {
      font-size: 0.875rem;
    }
  }
`;
