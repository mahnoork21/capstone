import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const SummaryContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;

  & h1 {
    width: 100%;
    font-size: 1.75rem;
    text-align: center;
    font-weight: 600;
  }

  & > p {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    margin-top: 4px;
  }
`;

export const ActivitySummaryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 16px;

  @media screen and (min-width: ${breakpoint.desktop}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ActivitySummary = styled.div`
  width: 100%;
  border: solid var(--primary-blue) 2px;
  border-radius: 12px;
  padding: 16px 8px;

  & h2 {
    font-size: 1.25rem;
    font-weight: 700;
  }

  & > div:first-child span {
    font-size: 1.25rem;
    font-weight: 700;
    padding: 0 4px;
  }

  & > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`;

export const SummaryItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  gap: 8px;
  margin-top: 8px;

  & > p {
    font-weight: 600;
  }
`;

export const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FinalCommentTextField = styled(TextField)`
  width: 680px;
  margin-top: 24px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
`;
