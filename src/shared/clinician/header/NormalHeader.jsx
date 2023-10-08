import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const NormalHeader = ({ handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { lg: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {/* Just to center the heading */}
        <Typography
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}
        />
        <Typography variant="h5" noWrap component="div">
          PUFI-2
        </Typography>
        <Typography />
      </Toolbar>
    </AppBar>
  );
};

export default NormalHeader;
