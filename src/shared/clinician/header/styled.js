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
  @media only screen and (min-width: ${breakpoint.desktop}) {
    display: none;
  }
`;
export const HeaderToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;
export const HeaderMenuIconButton = styled(IconButton)`
  display: block;
  @media only screen and (min-width: ${breakpoint.desktop}) {
    & > svg{
    display: none;
    }
  }
  
  }
`;
