import MainContainer from "@/shared/components/main-container";
import { useEffect, useState } from "react";
import { HeaderContainer } from "./styled";
import { Typography } from "@mui/material";
import { HeaderAppBar, HeaderToolbar, HeaderMenuIconButton } from "./styled";
import { Menu as MenuIcon } from "@mui/icons-material";
const Header = (handleDrawerToggle) => {
  return (
    <>
      <HeaderAppBar position="fixed">
        <HeaderToolbar>
          <HeaderMenuIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </HeaderMenuIconButton>
          <Typography variant="h5" noWrap component="div">
            PUFI-2
          </Typography>
          <div />
        </HeaderToolbar>
      </HeaderAppBar>
    </>
  );
};
export default Header;
