import styled from "@emotion/styled";
import {
  Button,
  ListItemButton,
  Box,
  Drawer,
  SvgIcon,
  Typography,
} from "@mui/material";
import { breakpoint } from "@/styles/breakpoints";

const navbarWidth = "320px";

export const NavbarBox = styled(Box)`
  @media only screen and (min-width: ${breakpoint.desktop}) {
    flex-shrink: 0;
    width: ${navbarWidth};
  }
`;

export const MobileDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: ${navbarWidth};
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    display: none;
  }
`;

export const DesktopDrawer = styled(Drawer)`
  display: none;
  & .MuiDrawer-paper {
    width: ${navbarWidth};
  }
  @media only screen and (min-width: ${breakpoint.desktop}) {
    display: block;
  }
`;

export const MainAccountBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-content: center;
`;

export const StyledAccountSvgIcon = styled(SvgIcon)`
  width: 75px;
  height: 75px;
  margin: 16px 8px 16px 16px;
`;

export const InnerAccountDetailsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

export const StyledClinicianName = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 700;
`;

export const StyledViewProfileLink = styled(Typography)`
  font-weight: 600;
  text-decoration-line: underline;
`;

export const LogOutBtn = styled(Button)`
  border-radius: 12px;
  border: 2px solid var(--pufi-primary-blue, #1979be);
  flex-grow: 1;
`;

export const MobileNavContainer = styled.div`
  display: flex;
`;

export const SpecialHighlightedListItemBtn = styled(ListItemButton)`
  &.Mui-selected {
    color: var(--pufi-primary-blue, #1979be);

    & svg {
      color: var(--pufi-primary-blue, #1979be);
    }
  }
`;

export const NavigationPanel = styled.div`
  background-color: white;
`;
