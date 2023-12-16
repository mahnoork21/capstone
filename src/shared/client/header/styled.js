import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const HeaderButton = styled(Button)`
  color: white;
  border-color: white;
  padding: 8px;
  border-radius: 12px;
  border-width: 2px;
  font-size: 1rem;

  &:hover {
    border-color: white;
    border-width: 2px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 16px 36px;
  }
`;

export const HeaderContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  & > span {
    font-size: 2rem;
    color: white;
    font-weight: 700;

    @media only screen and (min-width: ${breakpoint.desktop}) {
      font-size: 2.5rem;
    }
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    height: 80px;
    padding: 0 24px;
    margin-bottom: 6px;
  }

  @media only screen and (max-width: 600px) {
    & > span {
      font-size: 1.5rem;
    }
  }
`;

export const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & a {
    margin-right: 24px;
    color: white;
    text-decoration: inherit;
    text-transform: uppercase;
    outline: none;
  }

  & a:last-child {
    margin-right: 0;
  }

  .MuiOutlinedInput-notchedOutline {
    border-width: 0px;
  }

  .MuiSelect-select {
    color: white;
  }

  svg {
    color: white;
  }

  .MuiInputBase-root {
    margin-right: 8px;
  }
`;
