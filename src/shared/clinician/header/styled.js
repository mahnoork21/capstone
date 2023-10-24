import styled from "@emotion/styled";
import { breakpoint } from "@/styles/breakpoints";
import { Button, AppBar, IconButton, Toolbar } from "@mui/material";

export const HeaderContainer = styled.div`
  display: none;
  width: 1440px;
  padding: 10px 0px 16px 0px;
  justify-content: center;
  align-items: center;

  & > span {
    display: flex;
    font-size: 40px;
    color: white;
    font-weight: 700;
  }
  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 0 24px;
    margin-bottom: 20px;
    display: flex;
  }
`;

export const HeaderAppBar = styled(AppBar)`
  z-index: 1201;
  display: flex;
`;

export const HeaderToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

export const HeaderMenuIconButton = styled(IconButton)`
  display: block;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    & > svg {
      display: none;
    }
  }
`;

export const HeaderButton = styled(Button)`
  color: white;
  border-color: white;
  padding: 16px 36px;
  border-radius: 12px;
  border-width: 2px;
  font-size: 16px;

  &:hover {
    border-color: white;
  }
`;

export const AuthHeaderContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
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
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 600px) {
    & > span {
      font-size: 1.5rem;
    }
  }
`;
