import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const QuestionWrapper = styled.div`
  width: 680px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
