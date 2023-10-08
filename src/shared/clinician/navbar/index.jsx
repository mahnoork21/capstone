import React, { useState, useContext } from "react";
import { ClinicianContext } from "@/context/ClinicianContext";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  HomeOutlined,
  AccountBoxOutlined,
  BallotOutlined,
  AccountCircle,
  Logout,
} from "@mui/icons-material";
import { LogOutBtn, SpecialHighlightedListItemBtn } from "./styled";

function Navbar({ window, mobileOpen, handleDrawerToggle, drawerWidth }) {
  const { breakpoint } = useContext(ClinicianContext);
  console.log(breakpoint);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // For selection of List Item
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const listItemsArray = [
    { IconType: HomeOutlined, text: "Dashboard" },
    { IconType: AccountBoxOutlined, text: "My Clients" },
    { IconType: BallotOutlined, text: "All Surveys" },
  ];

  const Content = () => (
    <Box>
      <Toolbar />
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircle />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Clinician Name" secondary="View Profile" />
        </ListItem>

        {listItemsArray.map(({ IconType, text }, index) => (
          <ListItem key={text} disablePadding>
            <SpecialHighlightedListItemBtn
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                <IconType />
              </ListItemIcon>
              <ListItemText primary={text} />
            </SpecialHighlightedListItemBtn>
          </ListItem>
        ))}

        <ListItem>
          <LogOutBtn variant="outlined">
            <Logout /> LOG OUT
          </LogOutBtn>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { md: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {Content()}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {Content()}
        </Drawer>
      </Box>
    </>
  );
}

export default Navbar;
