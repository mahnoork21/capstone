import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { FormControlLabel } from "@mui/material";

export const PufiFormControlLabel = styled(FormControlLabel)`
  width: 100%;
  max-width: 680px;
  padding: 10px;
  margin-bottom: 8px;
  margin-left: 0px;
  border-radius: 8px;

  &:hover {
    background-color: ${(props) =>
      props.checked ? "var(--primary-green-light)" : "rgba(58, 144, 52, 0.2)"};
  }

  background-color: ${(props) =>
    props.checked ? "var(--primary-green-light)" : "var(--pufi-grey-light)"};
  color: ${(props) => (props.checked ? "white" : "black")};

  &:checked {
    background-color: var(--primary-green);
  }

  @media screen and (min-width: ${breakpoint.desktop}) {
    width: 680px;
  }

  .Mui-checked {
    color: white;
  }
`;

export const OptionContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
