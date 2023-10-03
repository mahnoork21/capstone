import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { FormControlLabel } from "@mui/material";

export const PufiFormControlLabel = styled(FormControlLabel)`
  background-color: var(--pufi-grey-light);
  width: 100%;
  max-width: 680px;
  padding: 10px;
  margin-bottom: 8px;
  margin-left: 0px;
  border-radius: 8px;

  @media screen and (min-width: ${breakpoint.desktop}) {
    width: 680px;
  }
`;

export const OptionContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
