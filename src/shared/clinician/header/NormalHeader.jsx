import { Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { HeaderAppBar, HeaderMenuIconButton, HeaderToolbar } from "./styled";

const NormalHeader = ({ handleDrawerToggle }) => {
  return (
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
  );
};

export default NormalHeader;
