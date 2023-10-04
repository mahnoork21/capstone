import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const QuestionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: 680px;
  }
`;

export const GuideButton = styled(Button)`
  border-color: black;
  color: var(--nobul-black);
  width: 160px;
  height: 44px;
  font-size: 0.875rem;
  text-transform: none;
  font-weight: 700;
`;
