import { ClinicianContext } from "@/context/ClinicianContext";
import { FullscreenExit } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { React } from "react";
const Header = ({ text }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "1rem",
            background: "blue",
            backdropFilter: "blur(2px)",
            alignItems: "center",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" align="center">
              <b>PUFI-2</b>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default Header;
