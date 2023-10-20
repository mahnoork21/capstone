import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Button, ListItemButton, Box, Drawer } from "@mui/material";

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

export const NavbarBox = styled(Box)`
  @media only screen and (min-width: ${breakpoint.desktop}) {
    flex-shrink: 0;
    width: 220px;
  }
`;

export const MobileDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 220px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    display: none;
  }
`;

export const DesktopDrawer = styled(Drawer)`
  display: none;
  & .MuiDrawer-paper {
    width: 220px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}) {
    display: block;
  }
`;
