import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { IconButton, TextField } from "@mui/material";

export const SummaryContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  padding-bottom: 32px;

  & h1 {
    width: 100%;
    font-size: 1.375rem;
    text-align: start;
    font-weight: 600;

    @media screen and (min-width: ${breakpoint.desktop}) {
      font-size: 1.75rem;
      text-align: center;
    }
  }

  & > p {
    width: 100%;
    text-align: start;
    font-size: 0.875;
    padding: 0 32px;

    @media screen and (min-width: ${breakpoint.desktop}) {
      font-size: 1rem;
      text-align: center;
      margin-top: 4px;
    }
  }

  @media screen and (min-width: ${breakpoint.desktop}) {
    padding: 24px;
    padding-bottom: 40px;
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

    @media screen and (min-width: ${breakpoint.desktop}) {
      font-size: 1.25rem;
    }
  }

  & > div:first-child span {
    font-size: 1.25rem;
    font-weight: 700;
    padding: 0 4px;
  }

  & > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: start;
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
  width: 100%;
  margin-top: 12px;

  @media screen and (min-width: ${breakpoint.desktop}) {
    width: 680px;
    margin-top: 24px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
`;

export const StyledEditButton = styled(IconButton)`
  color: black;
  position: relative;
  top: -6px;
`;
